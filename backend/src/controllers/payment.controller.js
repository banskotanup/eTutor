const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create a payment (Student)
exports.createPayment = async (req, res) => {
    try {
        const { amount, gateway, subjectId } = req.body;
        if (!amount || !gateway || !subjectId) {
            return res.status(400).json({
                message: "Amount, gateway and subjectId are required",
            });
        }

        //check subject exists
        const subject = await prisma.subject.findUnique({
            where: {id: parseInt(subjectId)},
        });

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        //create payment record
        const payment = await prisma.payment.create({
            data: {
                amount: parseInt(amount),
                gateway,
                subjectId: parseInt(subjectId),
                studentId: req.user.id,
                status: "pending",
            },
        });

        return res.status(200).json({message: "Payment request created", payment,});
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//get my payment (student)
exports.getMyPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            where: { studentId: req.user.id },
            include: {
                subject: {select: {id: true, title: true}},
            },
            orderBy: {createdAt: "desc"},
        });
        return res.json(payments);
    }  
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//get all payments (admin)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                student: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                subject: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return res.json(payments);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};

//update payment status (admin)
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { status, transactionId } = req.body;
        const paymentId = parseInt(req.params.id);

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        //prepare update data
        let updateData = {
            status,
            transactionId: transactionId || null, 
        };

        if (status === "paid") {
            updateData.paidAt = new Date();
        }
        else {
            updateData.paidAt = null;
        }

        const updated = await prisma.payment.update({
            where: { id: paymentId },
            data: updateData,
        });

        return res.json({
            message: "Payment status updated",
            updated,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};