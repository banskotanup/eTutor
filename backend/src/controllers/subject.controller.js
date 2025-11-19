const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create subject (admin only)
exports.createSubject = async (req, res) => {
  try {
    const { name, description, price, teacherId } = req.body;

    //check teacher existence
    const teacher = await prisma.user.findUnique({
      where: { id: parseInt(teacherId) },
    });

    if (!teacher) {
      return res.status(400).json({
        message: "Teacher does not exist",
      });
    }

    if (teacher.role !== "teacher") {
      return res
        .status(400)
        .json({ message: "Selected user is not a teacher" });
    }

    const subject = await prisma.subject.create({
      data: {
        title: name,
        description,
        price: parseInt(price),
        teacherId: parseInt(teacherId),
      },
      include: {
        teacher: true,
      },
    });
    return res.json({ message: "Subject created successfully", subject });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//update subject (admin)
exports.updateSubject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
      const { name, description, price, teacherId } = req.body;
      
      const data = {};

      if (name) data.title = name;
      if (description) data.description = description;
      if (price) data.price = parseInt(price);

    if (teacherId) {
      const teacher = await prisma.user.findUnique({
        where: { id: parseInt(teacherId) },
      });

      if (!teacher) {
        return res.status(400).json({
          message: "Teacher does not exist",
        });
      }

      if (teacher.role !== "teacher") {
        return res
          .status(400)
          .json({ message: "Selected user is not a teacher" });
        }
        data.teacherId = parseInt(teacherId);
    }

    const updated = await prisma.subject.update({
      where: { id },
      data,
      include: {
        teacher: true,
      },
    });

    return res.json({ message: "Subject updated successfully", updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//get all subject (admin)
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return res.json(subjects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get subject for teacher
exports.getTeacherSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        teacherId: req.user.id,
      },
    });
    return res.json(subjects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get subjects for student
// (Here all subjects are shown. Later we add enrollments.)

exports.getStudentSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();

    res.json(subjects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete subject (admin)
exports.deleteSubject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.subject.delete({
      where: { id },
    });

    return res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
