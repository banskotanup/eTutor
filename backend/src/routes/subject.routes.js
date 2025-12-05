const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { createSubject, updateSubject, getAllSubjects, getSubjectById, getTeacherSubjects, getStudentSubjects, deleteSubject } = require("../controllers/subject.controller");
const subjectRouter = Router();

//teacher routes
subjectRouter.get("/teacher", authMiddleware, authorizeRoles("teacher"), getTeacherSubjects);

//admin routes
subjectRouter.post("/create", authMiddleware, authorizeRoles("admin"), createSubject);
subjectRouter.patch("/update/:id", authMiddleware, authorizeRoles("admin"), updateSubject);
subjectRouter.get("/", authMiddleware, authorizeRoles("admin"), getAllSubjects);
subjectRouter.get("/:id", authMiddleware, authorizeRoles("admin"), getSubjectById);
subjectRouter.delete("/delete/:id", authMiddleware, authorizeRoles("admin"), deleteSubject);

//student routes
subjectRouter.get("/student", authMiddleware, authorizeRoles("student"), getStudentSubjects);

module.exports = subjectRouter;