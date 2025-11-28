const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    res.status(201).json({ message: "Message submitted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
