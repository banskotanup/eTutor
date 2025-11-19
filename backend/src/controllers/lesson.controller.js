const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create lesson teacher only
exports.createLesson = async (req, res) => {
  try {
    const { title, description, subjectId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const fileUrl = req.file.path;
    const fileType = req.file.mimetype;

    //check subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(subjectId) },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    //only teacher of the subject can upload
    if (subject.teacherId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not assigned to this subject" });
    }

    //fields based on file type
    let videoUrl = null;
    let pdfUrl = null;

    if (fileType.startsWith("video")) {
      videoUrl = fileUrl;
    } else if (fileType === "application/pdf") {
      pdfUrl = fileUrl;
    } else {
      return res
        .status(400)
        .json({ message: "Only video or pdf file allowed" });
    }

    //create lesson
    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        videoUrl,
        pdfUrl,
        subjectId: parseInt(subjectId),
        teacherId: req.user.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Lesson uploaded successfully", lesson });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get lessons of a subject
exports.getSubjectLessons = async (req, res) => {
  try {
      const subjectId = parseInt(req.params.subjectId);
      
      const subject = await prisma.subject.findUnique({
          where: {id: subjectId},
      });

      if (!subject) {
          return res.status(404).json({
              message: "Subject not found",
             lessons: [], 
          });
      }

    const lessons = await prisma.lesson.findMany({
      where: { subjectId },
    });
      
      if (lessons.length === 0) {
          return res.status(200).json({
              message: "No lesson found for this subject",
              lessons: [],
          });
      }
    return res.json(lessons);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete lesson (teacher or admin)
exports.deleteLesson = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id);

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { subject: true },
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    //only admin or the teacher of that subject can delete
    if (req.user.role !== "admin" && req.user.id !== lesson.subject.teacherId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await prisma.lesson.delete({
      where: { id: lessonId },
    });
      
      return res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
