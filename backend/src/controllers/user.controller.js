const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendStatusEmail = require('../utils/sendStatusEmail');
const sendUserUpdateEmail = require('../utils/sendUserUpdateEmail');

//get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 10;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: page * pageSize,
        take: pageSize,
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
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count(),
    ]);

    const formatted = users.map((u) => ({
      ...u,
      userName: `${u.firstName} ${u.lastName}`,
      createdAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : null,
    }));

    return res.json({
      rows: formatted,
      total,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      createdAtFormatted: new Date(user.createdAt).toLocaleString(),
      updatedAtFormatted: new Date(user.updatedAt).toLocaleString(),
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


//get teacher only
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await prisma.user.findMany({
            where: {
                role: "teacher",
                status: "approved",
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
            }
        });
        return res.json(teachers);
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status. Use pending/approved/rejected." });
    }

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // RULES:
    if (user.status === "approved" && status !== "approved") {
      return res
        .status(400)
        .json({ message: "Approved user cannot be changed to another status." });
    }

    if (user.status === "rejected" && status !== "rejected") {
      return res
        .status(400)
        .json({ message: "Rejected user cannot be changed to another status." });
    }

    // Only pending can change
    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: { status },
    });

    // 1️⃣ Send email notification if status changed
    if (user.status !== status && (status === "approved" || status === "rejected")) {
      try {
        await sendStatusEmail(user.email, status, user.firstName);
      } catch (err) {
        console.error("Failed to send status email:", err);
      }
    }

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
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

// Example user update controller
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, role, status } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { firstName, lastName, email, phone, role, status },
    });

    // Send email notification
    try {
      await sendUserUpdateEmail(user.email, user.firstName);
    } catch (err) {
      console.error("Failed to send user update email:", err);
    }

    return res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
