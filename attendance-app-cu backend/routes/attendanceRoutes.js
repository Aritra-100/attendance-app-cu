const express = require("express");
const router = express.Router();

const {
  getAttendanceStats,
  getAttendanceGraph,
  getDailyAttendance,
  getFrequentAbsentees,
} = require("../controllers/attendanceController");

router.get("/:id/stats", getAttendanceStats);
router.get("/:id/graph", getAttendanceGraph);
router.get("/:batchId/daily", getDailyAttendance);
router.get("/:id/frequent-absentees", getFrequentAbsentees);

module.exports = router;
