const express = require("express");
const router = express.Router();

const {
  getBatches,
  getSelectedBatches,
  addBatch,
  deleteBatch,
  renameBatch,
  updateThreshold,
} = require("../controllers/batchController");

router.get("/", getBatches);
router.get("/:id", getSelectedBatches);
router.post("/", addBatch);
router.delete("/:id", deleteBatch);
router.patch("/:id", renameBatch);
router.patch("/:id/threshold", updateThreshold);

module.exports = router;
