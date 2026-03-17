const express = require("express");
const router = express.Router();

const {
  getBatches,
  addBatch,
  deleteBatch,
  renameBatch
} = require("../controllers/batchController");

router.get("/", getBatches);
router.post("/", addBatch);
router.delete("/:id", deleteBatch);
router.patch("/:id", renameBatch);

module.exports = router;