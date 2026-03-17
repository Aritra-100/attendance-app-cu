const { readData, writeData } = require("../utils/fileStorage");

exports.getAttendance = (req, res) => {
  const attendance = readData("attendance.json");
  res.json(attendance);
};

exports.addAttendance = (req, res) => {
  const attendance = readData("attendance.json");

  const newAttendance = {
    id: Date.now().toString(),
    ...req.body,
  };

  attendance.push(newAttendance);

  writeData("attendance.json", attendance);

  res.json(newAttendance);
};

exports.deleteAttendance = (req, res) => {
  let attendance = readData("attendance.json");

  attendance = attendance.filter((record) => record.id !== req.params.id);

  writeData("attendance.json", attendance);

  res.json({ message: "Attendance record deleted" });
};
