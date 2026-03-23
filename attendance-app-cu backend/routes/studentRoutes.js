const express = require("express");
const router = express.Router();

const {
  getStudentsByBatch,
  addStudent,
  removeStudentFromBatch,
  deleteStudent,
} = require("../controllers/studentController");

router.get("/:batchId", getStudentsByBatch);
router.post("/", addStudent);
router.delete("/:id/:batchId", removeStudentFromBatch);
router.delete("/:id", deleteStudent);

module.exports = router;
