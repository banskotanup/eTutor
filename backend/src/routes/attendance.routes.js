const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const {
  studentJoinClass,
  markAttendance,
  getAttendanceByClass,
  getMyAttendance,
  teacherDashboard,
  adminAnalytics,
} = require("../controllers/attendance.controller");

const attendanceRouter = Router();

// ====================================================
// STUDENT: JOIN LIVE CLASS → auto mark PRESENT
// ====================================================
attendanceRouter.put(
  "/join/:classId",
  authMiddleware,
  authorizeRoles("student"),
  studentJoinClass
);

// ====================================================
// TEACHER: MANUALLY MARK ATTENDANCE
// ====================================================
attendanceRouter.post(
  "/mark",
  authMiddleware,
  authorizeRoles("teacher"),
  markAttendance
);

// ====================================================
// TEACHER: GET ATTENDANCE FOR A CLASS
// ====================================================
attendanceRouter.get(
  "/class/:classId",
  authMiddleware,
  authorizeRoles("teacher", "admin"),
  getAttendanceByClass
);

// ====================================================
// STUDENT: GET PERSONAL ATTENDANCE HISTORY
// ====================================================
attendanceRouter.get(
  "/my",
  authMiddleware,
  authorizeRoles("student"),
  getMyAttendance
);

// ====================================================
// TEACHER DASHBOARD ANALYTICS
// ====================================================
attendanceRouter.get(
  "/dashboard/teacher",
  authMiddleware,
  authorizeRoles("teacher"),
  teacherDashboard
);

// ====================================================
// ADMIN ANALYTICS → platform-wide stats
// ====================================================
attendanceRouter.get(
  "/dashboard/admin",
  authMiddleware,
  authorizeRoles("admin"),
  adminAnalytics
);

module.exports = attendanceRouter;
