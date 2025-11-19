const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const { createLesson, getSubjectLessons, deleteLesson } = require("../controllers/lesson.controller");

const lessonRouter = Router();

lessonRouter.post("/create", authMiddleware, authorizeRoles("teacher"), upload.single("file"), createLesson);

//anyone logged in can view lessons of subject
lessonRouter.get("/:subjectId", authMiddleware, getSubjectLessons);

//admin or teacher can delete
lessonRouter.delete("/delete/:id", authMiddleware, authorizeRoles("teacher", "admin"), deleteLesson);

module.exports = lessonRouter;