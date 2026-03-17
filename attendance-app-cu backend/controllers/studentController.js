const { readData, writeData } = require("../utils/fileStorage");

exports.getStudents = (req, res) => {
  const students = readData("students.json");
  res.json(students);
};

exports.addStudent = (req, res) => {
  const students = readData("students.json");

  const newStudent = {
    id: Date.now().toString(),
    ...req.body,
  };

  students.push(newStudent);

  writeData("students.json", students);

  res.json(newStudent);
};

exports.deleteStudent = (req, res) => {
  let students = readData("students.json");

  students = students.filter((student) => student.id !== req.params.id);

  writeData("students.json", students);

  res.json({ message: "Student deleted" });
};
