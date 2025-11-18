const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create subject (admin only)
exports.createSubject = async (req, res) => {
    try {
        const { name, description, price, teacherId } = req.body;
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
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//update subject (admin)
exports.updateSubject = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, teacherId } = req.body;

        const updated = await prisma.subject.update({
            where: { id },
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

        return res.json({ message: "Subject updated successfully", updated });
    }
    catch (err) {
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
    }
    catch (err) {
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
    }
    catch (err) {
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
    }
    catch (err) {
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
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};