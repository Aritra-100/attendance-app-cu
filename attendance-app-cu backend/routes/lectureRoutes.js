const express = require("express");
const router = express.Router();

const {
  getLectures,
  addLecture,
  deleteLecture,
} = require("../controllers/lectureController");

router.get("/", getLectures);
router.post("/", addLecture);
router.delete("/:id", deleteLecture);

module.exports = router;
