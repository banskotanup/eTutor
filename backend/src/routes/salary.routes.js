const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
const { createSalary, updateSalaryStatus, getTeacherSalary, getMySalary } = require("../controllers/salary.controller");
const salaryRouter = Router();

salaryRouter.post("/create", authMiddleware, authorizeRoles("admin"), createSalary);
salaryRouter.patch("/update/:id", authMiddleware, authorizeRoles("admin"), updateSalaryStatus);
salaryRouter.get("/teacher/:id", authMiddleware, authorizeRoles("admin"), getTeacherSalary);
salaryRouter.get("/my-salary", authMiddleware, authorizeRoles("teacher"), getMySalary);

module.exports = salaryRouter;