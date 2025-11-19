const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//student submit assignment
exports.submitAssignment = async (req, res) => {
    try {
        const assignmentId = parseInt(req.params.assignmentId);
        if (!req.file) {
            return res.status(400).json({ message: "Submission file is required" });
        }
        const fileUrl = req.file.path;

        //check assignment exists
        const assignment = await prisma.assignment.findUnique({
            where: {id: assignmentId},
        });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        //prevent duplicate submission
        const already = await prisma.submission.findFirst({
            where: {
                assignmentId: assignmentId,
                studentId: req.user.id,
            },
        });
        if (already) {
            return res.status(400).json({ message: "You have already submitted this assignment" });
        }

        //create submission
        const submission = await prisma.submission.create({
            data: {
                fileUrl,
                assignmentId: assignmentId,
                studentId: req.user.id,
                status: "submitted",
            },
        });
        return res.status(200).json({ message: "Assignment submitted successfully", submission });
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//teacher gets submission
exports.getSubmissionByAssignment = async (req, res) => {
    try {
        const assignmentId = parseInt(req.params.assignmentId);

        const submissions = await prisma.submission.findMany({
            where: { assignmentId },
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
            orderBy: {submittedAt: "desc"}
        });
        return res.json(submissions);
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//teacher grades submission
exports.gradeSubmission = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { marks } = req.body;

        const submission = await prisma.submission.update({
            where: { id },
            data: {
                marks: parseInt(marks),
                status: "graded",
            },
        });
        return res.json({
            message: "Submission graded successfully",
            submission,
        });
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
};

//delete submission
exports.deleteSubmission = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.submission.delete({
            where: {id},
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};