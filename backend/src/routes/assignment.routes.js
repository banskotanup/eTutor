const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { createAssignment, getAssignmentBySubject, deleteAssignment } = require("../controllers/assignment.controller");
const upload = require("../middlewares/upload.middleware");
const assignmentRouter = Router();

assignmentRouter.post("/create", authMiddleware, authorizeRoles("teacher"), upload.single("file"), createAssignment);
assignmentRouter.get("/:subjectId", authMiddleware, getAssignmentBySubject);
assignmentRouter.delete("/delete/:id", authMiddleware, authorizeRoles("teacher", "admin"), deleteAssignment);

module.exports = assignmentRouter;