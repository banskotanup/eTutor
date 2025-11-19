const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create assignment (teacher only)
exports.createAssignment = async (req, res) => {
    try {
        const { title, description, subjectId, dueDate } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Assignment file is required" });
        }

        const fileUrl = req.file.path;

        //check subject exists
        const subject = await prisma.subject.findUnique({
            where: {id: parseInt(subjectId)},
        });

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        //prevent wrong teacher
        if (subject.teacherId !== req.user.id) {
            return res.status(403).json({
                message: "You are not assigned to this subject",
            });
        }

        //create assignment
        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                fileUrl,
                dueDate: new Date(dueDate),
                subjectId: parseInt(subjectId),
                teacherId: req.user.id,
            },
        });
        return res.status(200).json({
            message: "Assignment created successfully",
            assignment,
        });
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getAssignmentBySubject = async (req, res) => {
    try {
        const subjectId = parseInt(req.params.subjectId);
        const assignments = await prisma.assignment.findMany({
            where: {subjectId},
        });
        if (assignments.length === 0) {
            return res.json({ message: "No assignment found", assignments: []});
        }
        return res.json(assignments)
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//delete assignment (teacher or admin)

exports.deleteAssignment = async (req, res) => {
    try {
        const assignmentId = parseInt(req.params.id);
        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: {subject: true},
        });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        //only assigned teacher or admin can delete
        if (req.user.role !== "admin" && req.user.id !== assignment.subject.teacherId) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await prisma.assignment.delete({
            where: {id: assignmentId},
        });
        return res.json({ message: "Assignment deleted successfully" });
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};