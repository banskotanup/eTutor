const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ========================================================
// 1️⃣ AUTO-GENERATE ATTENDANCE WHEN CLASS STARTS
// ========================================================
exports.autoGenerateAttendance = async (classId) => {
  try {
    // find class
    const liveClass = await prisma.liveClass.findUnique({
      where: { id: classId },
    });

    if (!liveClass) return;

    // find all students (role = student)
    const students = await prisma.user.findMany({
      where: { role: "student" },
      select: { id: true },
    });

    // create absent records for all students
    await Promise.all(
      students.map((s) =>
        prisma.attendance.create({
          data: {
            studentId: s.id,
            classId: liveClass.id,
            status: "absent",
          },
        })
      )
    );

    console.log("Auto attendance generated!");
  } catch (err) {
    console.log("AUTO ATTENDANCE ERROR:", err);
  }
};

// ========================================================
// 2️⃣ STUDENT JOIN VALIDATION → MARK PRESENT AUTOMATICALLY
// ========================================================
exports.studentJoinClass = async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);

    // check class
    const liveClass = await prisma.liveClass.findUnique({
      where: { id: classId },
    });

    if (!liveClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // check class has not ended
    if (liveClass.endTime) {
      return res.status(400).json({ message: "Class already ended" });
    }

    // find attendance row
    const attendance = await prisma.attendance.findFirst({
      where: {
        studentId: req.user.id,
        classId: classId,
      },
    });

    if (!attendance) {
      return res.status(400).json({
        message: "Attendance record not generated for you",
      });
    }

    // update to present
    const updated = await prisma.attendance.update({
      where: { id: attendance.id },
      data: { status: "present" },
    });

    return res.json({
      message: "You have successfully joined the class",
      attendance: updated,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ========================================================
// 3️⃣ TEACHER MANUAL ATTENDANCE (OVERRIDE)
// ========================================================
exports.markAttendance = async (req, res) => {
  try {
      const { studentId, classId, status } = req.body;
      
      const student = await prisma.user.findUnique({
          where: { id: parseInt(studentId) },
      });
      
      if (!student) {
          return res.status(404).json({ message: "Sorry we couldn't find you on our database." });
      }

      if (student.role !== "student") {
          return res.status(400).json({ message: "You are not a student" });
      }

    const liveClass = await prisma.liveClass.findUnique({
      where: { id: parseInt(classId) },
    });

    if (!liveClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (liveClass.teacherId !== req.user.id) {
      return res.status(403).json({ message: "Not your class" });
    }

    // update existing record
    const updated = await prisma.attendance.updateMany({
      where: {
        studentId: parseInt(studentId),
        classId: parseInt(classId),
      },
      data: {
        status,
      },
    });

    return res.json({
      message: "Attendance updated",
      updated,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ========================================================
// 4️⃣ GET ATTENDANCE FOR A CLASS (TEACHER)
// ========================================================
exports.getAttendanceByClass = async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);

    const records = await prisma.attendance.findMany({
      where: { classId },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { timestamp: "desc" },
    });

    return res.json(records);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ========================================================
// 5️⃣ STUDENT PERSONAL ATTENDANCE HISTORY
// ========================================================
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await prisma.attendance.findMany({
      where: { studentId: req.user.id },
      include: {
        liveClass: {
          select: {
            id: true,
            startTime: true,
          },
        },
      },
    });

    return res.json(records);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ========================================================
// 6️⃣ TEACHER DASHBOARD → CLASS ANALYTICS
// ========================================================
exports.teacherDashboard = async (req, res) => {
  try {
    const classes = await prisma.liveClass.findMany({
      where: { teacherId: req.user.id },
      include: {
        attendance: true,
      },
    });

    const stats = classes.map((c) => ({
      classId: c.id,
      date: c.startTime,
      present: c.attendance.filter((a) => a.status === "present").length,
      absent: c.attendance.filter((a) => a.status === "absent").length,
    }));

    return res.json(stats);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ========================================================
// 7️⃣ ADMIN ANALYTICS → WHOLE PLATFORM ATTENDANCE SUMMARY
// ========================================================
exports.adminAnalytics = async (req, res) => {
  try {
    const totalStudents = await prisma.user.count({
      where: { role: "student" },
    });

    const totalClasses = await prisma.liveClass.count();

    const attendanceStats = await prisma.attendance.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    return res.json({
      totalStudents,
      totalClasses,
      attendance: attendanceStats,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};