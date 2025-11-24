const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create salary record (admin)
exports.createSalary = async (req, res) => {
    try {
        const { teacherId, amount, month } = req.body;
        if (!teacherId || !amount || !month) {
            return res.status(400).json({message: "All fields are required"});
        }

        //check teacher exists
        const teacher = await prisma.user.findUnique({
            where: {id: parseInt(teacherId)},
        });

        if (!teacher || teacher.role !== "teacher") {
            return res.status(400).json({ message: "Invalid teacher ID" });
        }

        const salary = await prisma.salary.create({
            data: {
                teacherId: parseInt(teacherId),
                amount: parseInt(amount),
                month,
                status: "pending",
            },
        });

        return res.json({ message: "Salary record created", salary });
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//update salary status (admin)
exports.updateSalaryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const salaryId = parseInt(req.params.id);

        const updated = await prisma.salary.update({
            where: { id: salaryId },
            data: {status},
        });

        return res.json({ message: "Salary status updated", updated });
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//get salary history of teacher (admin)
exports.getTeacherSalary = async (req, res) => {
    try {
        const teacherId = parseInt(req.params.id);

        const salaries = await prisma.salary.findMany({
            where: { teacherId },
            orderBy: {createdAt: "desc"},
        });

        return res.json(salaries);
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// teacher own salary history (teacher)
exports.getMySalary = async (req, res) => {
    try {
        const salaries = await prisma.salary.findMany({
            where: { teacherId: req.user.id },
            orderBy: {createdAt: "desc"},
        });

        return res.json(salaries);
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};