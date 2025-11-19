const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const { submitAssignment, getSubmissionByAssignment, gradeSubmission, deleteSubmission } = require("../controllers/submission.controller");
const submissionRouter = Router();

submissionRouter.post("/submit/:assignmentId", authMiddleware, authorizeRoles("student"), upload.single("file"), submitAssignment);
submissionRouter.get("/assignment/:assignmentId", authMiddleware, authorizeRoles("teacher", "admin", "student"), getSubmissionByAssignment);
submissionRouter.put("/grade/:id", authMiddleware, authorizeRoles("teacher", "admin"), gradeSubmission);
submissionRouter.delete("/delete/:id", authMiddleware, authorizeRoles("admin"), deleteSubmission);

module.exports = submissionRouter;