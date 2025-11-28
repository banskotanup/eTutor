const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
    const { email, password, rememberMe } = req.body;

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

    // ----------------------------
    // ACCESS TOKEN (Short: 15m)
    // ----------------------------
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ----------------------------
    // REMEMBER ME → Refresh Token
    // ----------------------------
    let refreshToken = null;

    if (rememberMe) {
      refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      // Store hashed refresh token in DB
      const hashed = await bcrypt.hash(refreshToken, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          refreshToken: hashed,
          refreshTokenExpiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ),
        },
      });

      // Set Cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token: accessToken, // keep same name for frontend compatibility
      rememberMe: rememberMe || false,
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
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required." });

    // 1️⃣ Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not found." });

    // 2️⃣ Generate reset token (valid for 1 hour)
    const token = crypto.randomBytes(32).toString("hex");

    // Save token and expiry in database (10 minutes)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // 3️⃣ Create password reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // 4️⃣ Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for 587 or others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5️⃣ Prepare email content
    const mailOptions = {
      from: `"LMS Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.firstName || user.email},</p>
        <p>We received a request to reset your LMS account password. Please click the link below to create a new password:</p>
        <p><a href="${resetLink}" style="background:#1976d2;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a></p>
        <p><strong>Important:</strong> This link is valid for 1 hour only. After that, you will need to request a new password reset.</p>
        <p>If you did not request this, you can safely ignore this email. Your password will remain unchanged.</p>
        <p>For any issues, contact our support team at <a href="mailto:support@lms.com">support@lms.com</a>.</p>
        <br>
        <p>Thanks,<br/>The LMS Team</p>
      `,
    };

    // 6️⃣ Send email
    await transporter.sendMail(mailOptions);

    res.json({
      message:
        "A password reset link has been sent to your email. Please check your inbox. The link is valid for 10 minutes.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return res
        .status(400)
        .json({ message: "Token and password are required" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    // Find user with token and valid expiry
    const user = await prisma.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// --------------------------------------------
// REFRESH ACCESS TOKEN
// --------------------------------------------
exports.refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) return res.status(401).json({ message: "User not found" });

  const isValid = await bcrypt.compare(token, user.refreshToken || "");
  if (!isValid)
    return res.status(401).json({ message: "Token mismatch (DB invalid)" });

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ accessToken });
};


// --------------------------------------------
// LOGOUT
// --------------------------------------------
exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        refreshToken: null,
        refreshTokenExpiresAt: null,
      },
    });

    return res.json({ message: "Logged out" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Logout failed" });
  }
};