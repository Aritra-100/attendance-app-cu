const { readData, writeData } = require("../utils/fileStorage");

exports.getBatches = (req, res) => {
  const batches = readData("batches.json");
  res.json(batches);
};

exports.addBatch = (req, res) => {
  const batches = readData("batches.json");

  const newBatch = {
    id: Date.now().toString(),
    name: req.body.name,
  };

  batches.push(newBatch);

  writeData("batches.json", batches);

  res.json(newBatch);
};

exports.deleteBatch = (req, res) => {
  let batches = readData("batches.json");

  batches = batches.filter((b) => b.id !== req.params.id);

  writeData("batches.json", batches);

  res.json({ message: "Batch deleted" });
};

exports.renameBatch = (req, res) => {
  const batches = readData("batches.json");

  const updatedBatches = batches.map((batch) => {
    if (batch.id === req.params.id) {
      return { ...batch, name: req.body.name };
    }
    return batch;
  });

  writeData("batches.json", updatedBatches);

  res.json({ message: "Batch renamed successfully" });
};
