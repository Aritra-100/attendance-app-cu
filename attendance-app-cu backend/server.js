const express = require("express");
const cors = require("cors");

const batchRoutes = require("./routes/batchRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const lectureRoutes = require("./routes/lectureRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/batches", batchRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/lectures", lectureRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});