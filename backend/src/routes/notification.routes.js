const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");

const { createNotification, getMyNotifications, markAsRead } = require("../controllers/notification.controller");
const notificationRouter = Router();

notificationRouter.post("/create", authMiddleware, createNotification);
notificationRouter.get("/my-notification", authMiddleware, getMyNotifications);
notificationRouter.patch("/read/:id", authMiddleware, markAsRead);

module.exports = notificationRouter;