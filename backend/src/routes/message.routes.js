const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");

const {
  sendMessage,
  getInbox,
  getSent,
  getChatWithUser,
} = require("../controllers/message.controller");

const messageRouter = Router();

messageRouter.post("/send", authMiddleware, sendMessage);
messageRouter.get("/inbox", authMiddleware, getInbox);
messageRouter.get("/sent", authMiddleware, getSent);
messageRouter.get("/chat/:userId", authMiddleware, getChatWithUser);

module.exports = messageRouter;
