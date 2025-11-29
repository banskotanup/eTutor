const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const authRouter = Router();

authRouter.post("/send-otp", authController.sendOtp);
authRouter.post("/verify-otp", authController.verifyOtp);
authRouter.post("/login", authController.login);
authRouter.post("/refresh-token", authController.refreshAccessToken);
authRouter.post("/logout", authMiddleware, authController.logout);
authRouter.get("/me", authMiddleware, authController.getMe);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.put("/reset-password", authController.resetPassword);

module.exports = authRouter;