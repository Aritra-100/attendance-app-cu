import { useContext, useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import BatchContext from "../../context/batch/BatchContext";
import "./Attendance.css";

const Attendance = () => {
  const { activeBatch } = useContext(BatchContext);
  const ATTENDANCE_THRESHOLD = 75;

  // Selected batch from calender
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Record of students
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!activeBatch || !selectedDate) return;

    // fetch attendance by batch + date
    // console.log("Selected date:", selectedDate);

    const mockAttendance = [
      {
        id: 1,
        name: "Amit Kumar",
        roll: "CS101",
        present: true,
        percentage: 92,
      },
      {
        id: 2,
        name: "Priya Sharma",
        roll: "CS102",
        present: false,
        percentage: 75,
      },
      {
        id: 3,
        name: "Rahul Das",
        roll: "CS103",
        present: true,
        percentage: 65,
      },
      {
        id: 4,
        name: "Sneha Roy",
        roll: "CS104",
        present: true,
        percentage: 95,
      },
    ];

    setRecords(mockAttendance);
  }, [activeBatch, selectedDate]);

  if (!activeBatch) return null;

  const total = records.length;
  const presentCount = records.filter((s) => s.present).length;
  const batchPercentage =
    total === 0 ? 0 : Math.round((presentCount / total) * 100);

  return (
    <div className="container-fluid attendance-page">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="attendance-title">Attendance</h2>
        <p className="attendance-subtitle">
          View attendance records for {activeBatch.name}
        </p>
      </div>

      {/* DATE + SUMMARY ROW */}
      <div className="row g-4 mb-4">
        {/* CALENDAR */}
        <div className="col-md-6">
          <div className="card attendance-card h-100">
            <div className="card-body d-flex justify-content-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                showOutsideDays
                disabled={{ after: new Date() }}
              />
            </div>
          </div>
        </div>

        {/* BATCH SUMMARY */}
        <div className="col-md-6">
          <div className="card attendance-card h-100 batch-summary">
            <div className="card-body batch-summary-body">
              <div className="summary-left">
                <p className="stats-title mb-1">Batch Attendance</p>
                <h2 className="stats-value">{batchPercentage}%</h2>
                <small className="text-muted">
                  {presentCount} / {total} present
                </small>
              </div>

              <div className="summary-right">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${batchPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="card attendance-card">
        <div className="card-body">
          <h5 className="card-title mb-3">Students</h5>

          {records.length === 0 ? (
            <p className="text-muted">No attendance recorded for this date</p>
          ) : (
            <div className="attendance-list">
              {records.map((s) => (
                <div key={s.id} className="attendance-row">
                  <div className="student-info">
                    <p className="student-name">{s.name}</p>
                    <small className="text-muted">Roll No: {s.roll}</small>
                  </div>

                  <div className="student-metrics">
                    {/* ⚠️ Low attendance marker */}
                    {s.percentage < ATTENDANCE_THRESHOLD && (
                      <span
                        className="low-attendance-badge"
                        title="Attendance below 75%"
                      >
                        ⚠️
                      </span>
                    )}

                    <span className="student-percent">{s.percentage}%</span>

                    <span
                      className={`status-pill ${
                        s.present ? "present" : "absent"
                      }`}
                    >
                      {s.present ? "Present" : "Absent"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
