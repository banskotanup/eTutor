const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create live class (teacher only)
exports.createLiveClass = async (req, res) => {
  try {
    const { startTime, subjectId, meetingUrl } = req.body;

    //required field
    if (!startTime || !subjectId) {
      return res.status(400).json({
        message: "Start time and subject id are required",
      });
    }

    //validate date format
    if (isNaN(Date.parse(startTime))) {
      return res.status(400).json({ message: "Invalid start time format" });
    }

    const start = new Date(startTime);
    const now = new Date();

    //prevent past classes
    if (start < now) {
      return res.status(400).json({
        message: "Start time must be in future",
      });
    }

    //validate subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(subjectId) },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    //check teacher owns the subject
    if (subject.teacherId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not assigned to teach this subject" });
    }

    //prevent exact same time duplication
    const exists = await prisma.liveClass.findFirst({
      where: {
        subjectId: parseInt(subjectId),
        startTime: start,
      },
    });

    if (exists) {
      return res.status(400).json({
        message: "A class already exists at this time for this subject",
      });
    }

    //create class
    const liveClass = await prisma.liveClass.create({
      data: {
        startTime: start,
        meetingUrl,
        subjectId: parseInt(subjectId),
        teacherId: req.user.id,
      },
    });

      //auto generate attendance for all student
    const allStudents = await prisma.user.findMany({
      where: { role: "student" },
      select: { id: true },
    });

    await Promise.all(
      allStudents.map((student) =>
        prisma.attendance.create({
          data: {
            studentId: student.id,
            classId: liveClass.id,
            status: "absent", // default
          },
        })
      )
    );

    console.log("Auto attendance created:", allStudents.length);

    return res.status(200).json({
      message: "Live class created successfully. Attendance initialized.",
      liveClass,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get live classes of a subject
exports.getAllLiveClasses = async (req, res) => {
  try {
    const classes = await prisma.liveClass.findMany({
      orderBy: { startTime: "asc" },
      include: {
        subject: true,
        teacher: true,
      },
    });
    if (classes.length === 0) {
      return res.json({ message: "No live classes found", classes: [] });
    }

    return res.json(classes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get classes by subject
exports.getClassesBySubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId);
    if (isNaN(subjectId)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const classes = await prisma.liveClass.findMany({
      where: { subjectId },
      include: {
        teacher: true,
      },
      orderBy: { startTime: "asc" },
    });
    if (classes.length === 0) {
      return res.json({
        message: "No live classes found for this subject",
        classes: [],
      });
    }
    return res.json(classes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//end class (teacher or admin)
exports.endLiveClass = async (req, res) => {
  try {
    const classId = parseInt(req.params.id);
    const liveClass = await prisma.liveClass.findUnique({
      where: { id: classId },
      include: { subject: true },
    });

    if (!liveClass) {
      return res.status(404).json({ message: "Live class not found" });
    }

    //authorization admin or teacher assigned
    const isAdmin = req.user.role === "admin";
    const isTeacher = req.user.id === liveClass.subject.teacherId;

    if (!isAdmin && !isTeacher) {
      return res.status(403).json({ message: "Not allowed" });
    }

    //already ended
    if (liveClass.endTime) {
      return res.status(400).json({ message: "Class already ended" });
    }

    const updated = await prisma.liveClass.update({
      where: { id: classId },
      data: { endTime: new Date() },
    });

    return res.json({ message: "Class ended successfully", updated });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete live class
exports.deleteLiveClass = async (req, res) => {
  try {
    const classId = parseInt(req.params.id);

    const liveClass = await prisma.liveClass.findUnique({
      where: { id: classId },
      include: { subject: true },
    });

    if (!liveClass) {
      return res.status(404).json({ message: "Live class not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isTeacher = req.user.id === liveClass.subject.teacherId;

    if (!isAdmin && !isTeacher) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await prisma.liveClass.delete({
      where: { id: classId },
    });
    return res.json({ message: "Live class deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
