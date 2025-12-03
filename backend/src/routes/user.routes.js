const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const { getUsers, updateUserStatus, updateRole, deleteUser, getTeachers } = require("../controllers/user.controller");

const userRouter = Router();

//only admin can manage user
userRouter.get("/", authMiddleware, authorizeRoles("admin"), getUsers);
userRouter.get("/teachers", authMiddleware, authorizeRoles("admin"), getTeachers);
userRouter.patch("/status/:id", authMiddleware, authorizeRoles("admin"), updateUserStatus);
userRouter.patch("/role/:id", authMiddleware, authorizeRoles("admin"), updateRole);
userRouter.delete("/delete/:id", authMiddleware, authorizeRoles("admin"), deleteUser);

module.exports = userRouter;