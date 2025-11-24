const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create notification
exports.createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ message: "User id and message are required" });
        }

        const notify = await prisma.notification.create({
            data: {
                userId: parseInt(userId),
                message,
            },
        });

        return res.json({ message: "Notification sent", notify });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//get my notification
exports.getMyNotifications = async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.user.id },
            orderBy: {createdAt: "desc"},
        });

        return res.json(notifications);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//mark as read
exports.markAsRead = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const updated = await prisma.notification.update({
            where: { id },
            data: {isRead: true},
        });

        return res.json({ message: "Marked as read", updated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};