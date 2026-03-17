const { readData, writeData } = require("../utils/fileStorage");

exports.getLectures = (req, res) => {
  const lectures = readData("lectures.json");
  res.json(lectures);
};

exports.addLecture = (req, res) => {
  const lectures = readData("lectures.json");

  const newLecture = {
    id: Date.now().toString(),
    ...req.body,
  };

  lectures.push(newLecture);

  writeData("lectures.json", lectures);

  res.json(newLecture);
};

exports.deleteLecture = (req, res) => {
  let lectures = readData("lectures.json");

  lectures = lectures.filter((lecture) => lecture.id !== req.params.id);

  writeData("lectures.json", lectures);

  res.json({ message: "Lecture deleted" });
};
