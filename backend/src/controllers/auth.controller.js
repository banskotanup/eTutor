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
                message: "Email already exists"
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
    }
    catch (err) {
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

        //check user
        const user = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid user or password" });
        }

        //create token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        return res.status(200).json({
            message: "Login successful",
            token,
            user,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};