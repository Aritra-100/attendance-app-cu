const express = require("express");
const router = express.Router();

const {
  getAttendance,
  addAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

router.get("/", getAttendance);
router.post("/", addAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
