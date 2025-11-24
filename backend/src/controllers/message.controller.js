const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// send message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: "receiverId and content required" });
    }

    const message = await prisma.message.create({
      data: {
        senderId: req.user.id,
        receiverId: parseInt(receiverId),
        content,
      },
    });

    return res.json({ message: "Message sent", data: message });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// inbox (messages sent TO me)
exports.getInbox = async (req, res) => {
  try {
    const inbox = await prisma.message.findMany({
      where: { receiverId: req.user.id },
      include: {
        sender: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(inbox);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// sent messages (messages I SENT)
exports.getSent = async (req, res) => {
  try {
    const sent = await prisma.message.findMany({
      where: { senderId: req.user.id },
      include: {
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(sent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// chat history between two users
exports.getChatWithUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const chat = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    return res.json(chat);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
