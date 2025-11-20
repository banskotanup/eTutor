const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { createLiveClass, getAllLiveClasses, getClassesBySubject, endLiveClass, deleteLiveClass } = require("../controllers/liveclass.controller");
const liveClassRouter = Router();

liveClassRouter.post("/create", authMiddleware, authorizeRoles("teacher"), createLiveClass);
liveClassRouter.get("/", authMiddleware, getAllLiveClasses);
liveClassRouter.get("/subject/:subjectId", authMiddleware, getClassesBySubject);
liveClassRouter.patch("/end/:id", authMiddleware, authorizeRoles("teacher", "admin"), endLiveClass);
liveClassRouter.delete("/delete/:id", authMiddleware, authorizeRoles("teacher", "admin"), deleteLiveClass);

module.exports = liveClassRouter;