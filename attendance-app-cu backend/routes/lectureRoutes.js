const express = require("express");
const router = express.Router();
const {
  getCurriculum,
  saveCurriculum,
  getPlan,
  savePlan,
} = require("../controllers/lectureController");

// Curriculum
router.get("/curriculum/:batchId", getCurriculum);
router.post("/curriculum/:batchId", saveCurriculum);

// Teaching Plan
router.get("/plan/:batchId", getPlan);
router.post("/plan/:batchId", savePlan);

module.exports = router;
