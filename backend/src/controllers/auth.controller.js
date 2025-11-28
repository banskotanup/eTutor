const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

//Register

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    //check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: role || "student",
        status: "pending",
      },
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // STATUS CHECK BEFORE TOKEN
    if (user.status === "pending") {
      return res.status(200).json({
        status: "pending",
        message: "Account under verification",
      });
    }

    if (user.status === "rejected") {
      return res.status(200).json({
        status: "rejected",
        message: "Registration rejected",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status,
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
