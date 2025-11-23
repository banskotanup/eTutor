const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const { createPayment, getMyPayments, getAllPayments, updatePaymentStatus } = require("../controllers/payment.controller");
const paymentRouter = Router();

paymentRouter.post("/create", authMiddleware, authorizeRoles("student"), createPayment);
paymentRouter.get("/my-payments", authMiddleware, authorizeRoles("student"), getMyPayments);
paymentRouter.get("/", authMiddleware, authorizeRoles("admin"), getAllPayments);
paymentRouter.patch("/update/:id", authMiddleware, authorizeRoles("admin"), updatePaymentStatus);

module.exports = paymentRouter;