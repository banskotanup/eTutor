const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.getMe);

module.exports = authRouter;