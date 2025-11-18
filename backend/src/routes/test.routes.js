const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const router = Router();

router.get("/student", authMiddleware, authorizeRoles("student"), (req, res) => {
    res.json({ message: "Student content" })
});
router.get("/teacher", authMiddleware, authorizeRoles("teacher"), (req, res) => {
    res.json({ message: "Teacher content" })
});
router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Admin content" })
});


module.exports = router;