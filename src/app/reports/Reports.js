import { useContext, useState, useMemo } from "react";
import BatchContext from "../../context/batch/BatchContext";
import "./Reports.css";

/* ✅ Static data OUTSIDE component */
const BASE_WEEK = [
  { day: "Mon", percent: 82 },
  { day: "Tue", percent: 50 },
  { day: "Wed", percent: 75 },
  { day: "Thu", percent: 90 },
  { day: "Fri", percent: 86 },
  { day: "Sat", percent: 70 },
];

const ATTENDANCE_THRESHOLD = 75;

const Reports = () => {
  const { activeBatch } = useContext(BatchContext);

  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [weekMode, setWeekMode] = useState("6"); // "5" or "6"

  // 🔹 Mock absentees data
  const frequentAbsentees = [
    { id: 1, name: "Rahul Das", absences: 4 },
    { id: 2, name: "Priya Sharma", absences: 3 },
    { id: 3, name: "Amit Kumar", absences: 3 },
  ];

  // ✅ Derived weekly data
  const weeklyAttendance = useMemo(() => {
    return weekMode === "5" ? BASE_WEEK.slice(0, 5) : BASE_WEEK;
  }, [weekMode]);

  // ✅ Week label
  const weekLabel = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay() + 1 + weekOffset * 7);

    const end = new Date(start);
    end.setDate(start.getDate() + (weekMode === "5" ? 4 : 5));

    const opts = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString(
      "en-US",
      opts
    )} – ${end.toLocaleDateString("en-US", opts)}`;
  }, [weekOffset, weekMode]);

  // ✅ Safe conditional render AFTER hooks
  if (!activeBatch) return null;

  return (
    <div className="container-fluid reports-page">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="reports-title">Reports</h2>
        <p className="reports-subtitle">
          Insights and trends for {activeBatch.name}
        </p>
      </div>

      {/* WEEKLY ATTENDANCE GRAPH */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card reports-card">
            <div className="card-body">
              {/* GRAPH HEADER */}
              <div className="reports-graph-header">
                <div>
                  <h5 className="card-title mb-1">Weekly Attendance Rate</h5>
                  <p className="reports-subtitle small mb-0">
                    Atendance percentage throughout the week
                  </p>
                </div>

                <div className="graph-controls">
                  <button
                    className="icon-btn"
                    onClick={() => setWeekOffset((p) => p - 1)}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  <span className="week-label">{weekLabel}</span>

                  {/* prevent future weeks */}
                  <button
                    className="icon-btn"
                    disabled={weekOffset >= 0}
                    onClick={() => setWeekOffset((p) => p + 1)}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>

                  <select
                    className="week-select"
                    value={weekMode}
                    onChange={(e) => setWeekMode(e.target.value)}
                  >
                    <option value="5">5 Day Week</option>
                    <option value="6">6 Day Week</option>
                  </select>
                </div>
              </div>

              {/* GRAPH / EMPTY STATE */}
              {weeklyAttendance.length === 0 ? (
                <div className="empty-graph">
                  <i className="fa-regular fa-calendar-xmark"></i>
                  <h6>No Classes Conducted</h6>
                  <p>No attendance was recorded for this week.</p>
                </div>
              ) : (
                <div className="bar-chart improved mt-4">
                  {weeklyAttendance.map((d) => (
                    <div key={d.day} className="bar-item">
                      <div className="bar-wrapper">
                        <div
                          className={`bar-fill ${
                            d.percent < ATTENDANCE_THRESHOLD ? "low" : ""
                          }`}
                          style={{ height: `${d.percent}%` }}
                        >
                          <span className="bar-tooltip">{d.percent}%</span>
                        </div>
                      </div>
                      <span className="bar-label">{d.day}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOST FREQUENT ABSENCES */}
      <div className="row g-4">
        <div className="col-md-12">
          <div className="card reports-card">
            <div className="card-body">
              <h5 className="card-title">Most Frequent Absences</h5>
              <p className="reports-subtitle small mb-3">
                Students with highest absence count
              </p>

              {frequentAbsentees.length === 0 ? (
                <p className="text-muted">No absence data available</p>
              ) : (
                <div className="absence-list">
                  {frequentAbsentees.map((s, index) => (
                    <div key={s.id} className="absence-row">
                      <span className="rank">#{index + 1}</span>
                      <span className="name">{s.name}</span>
                      <span className="count">{s.absences} absences</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
