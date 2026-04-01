const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getStudentsByBatch,
  addStudent,
  removeStudentFromBatch,
  deleteStudent,
} = require("../controllers/studentController");

router.get(
  "/:batchId",
  authMiddleware,
  roleMiddleware("teacher"),
  getStudentsByBatch,
);
router.post("/", authMiddleware, roleMiddleware("teacher"), addStudent);
router.delete(
  "/:id/:batchId",
  authMiddleware,
  roleMiddleware("teacher"),
  removeStudentFromBatch,
);
router.delete("/:id", authMiddleware, roleMiddleware("teacher"), deleteStudent);

module.exports = router;
