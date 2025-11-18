const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all users (admin only)
exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        return res.json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

//approve user
exports.approveUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await prisma.user.update({
            where: { id: userId },
            data: { status: "approved" },
        });

        return res.json({ message: "User approved successfully", user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

//update user role
exports.updateRole = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { role } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        return res.json({
            message: "Role updated successfully", user
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

//delete user
exports.deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        await prisma.user.delete({
            where: { id: userId },
        });
        return res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
};