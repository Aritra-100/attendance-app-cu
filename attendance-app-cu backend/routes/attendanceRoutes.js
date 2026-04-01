const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getAttendanceStats,
  getAttendanceGraph,
  getDailyAttendance,
  getFrequentAbsentees,
} = require("../controllers/attendanceController");

router.get(
  "/:id/stats",
  authMiddleware,
  roleMiddleware("teacher"),
  getAttendanceStats,
);
router.get(
  "/:id/graph",
  authMiddleware,
  roleMiddleware("teacher"),
  getAttendanceGraph,
);
router.get(
  "/:batchId/daily",
  authMiddleware,
  roleMiddleware("teacher"),
  getDailyAttendance,
);
router.get(
  "/:id/frequent-absentees",
  authMiddleware,
  roleMiddleware("teacher"),
  getFrequentAbsentees,
);

module.exports = router;
