import { useContext, useState, useMemo, useEffect } from "react";
import BatchContext from "../../context/batch/BatchContext";
import "./Reports.css";

const Reports = () => {
  const backendUrl = "http://localhost:5000/";
  const { activeBatch } = useContext(BatchContext);

  const [weeklyAttendance, setWeeklyAttendance] = useState([]);

  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [weekMode, setWeekMode] = useState("6"); // "5" or "6"

  // Attendance threshold
  const [threshold, setThreshold] = useState(0);

  // Frequent absentees
  const [frequentAbsentees, setFrequentAbsentees] = useState([]);

  const fetchFrequentAbsentees = async () => {
    try {
      const res = await fetch(
        `${backendUrl}api/attendance/${activeBatch.id}/frequent-absentees`,
      );
      const data = await res.json();

      setFrequentAbsentees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!activeBatch) return;

    fetchFrequentAbsentees();
    //eslint-disable-next-line
  }, [activeBatch]);

  // Get week range
  const getWeekRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // Make Monday the first day
    const day = start.getDay(); // 0 = Sun, 1 = Mon, ...
    const diff = (day === 0 ? -6 : 1 - day) + weekOffset * 7;

    start.setDate(start.getDate() + diff);

    const end = new Date(start);
    end.setDate(start.getDate() + (weekMode === "5" ? 4 : 5));
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  // Week label
  const weekLabel = useMemo(() => {
    const { start, end } = getWeekRange();

    const opts = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString("en-US", opts)} - ${end.toLocaleDateString("en-US", opts)}`;
    //eslint-disable-next-line
  }, [weekOffset, weekMode]);

  // Fetch graph data
  const fetchGraph = async () => {
    try {
      const res = await fetch(
        `${backendUrl}api/attendance/${activeBatch.id}/graph`,
      );
      const data = await res.json();

      const { start, end } = getWeekRange();

      const filtered = data.filter((d) => {
        const attendanceDate = new Date(d.date);
        return attendanceDate >= start && attendanceDate <= end;
      });

      if (filtered.length === 0) {
        setWeeklyAttendance([]);
        return;
      }

      // If no classes happened this week → show empty state
      if (filtered.length === 0) {
        setWeeklyAttendance([]);
        return;
      }

      // Convert to graph format
      const daysOrder =
        weekMode === "5"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri"]
          : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const dayMap = {};

      filtered.forEach((d) => {
        const day = new Date(d.date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        dayMap[day] = d.attendance_percentage;
      });

      const formatted = daysOrder.map((day) => ({
        day,
        percent: dayMap[day] || 0,
      }));

      setWeeklyAttendance(formatted);
    } catch (err) {
      console.error("Failed to fetch graph data", err);
    }
  };

  useEffect(() => {
    if (!activeBatch) return;

    fetchGraph();
    setThreshold(activeBatch.threshold);
    //eslint-disable-next-line
  }, [activeBatch, weekOffset, weekMode]);

  if (!activeBatch) {
    return <div className="p-4">Loading batch...</div>; // MAKE THIS GLOBAL AND BETTER LOOKING
  }

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
                            d.percent < threshold ? "low" : ""
                          }`}
                          style={{ height: `${d.percent}%` }}
                        >
                          <span className="bar-tooltip">
                            {d.percent === 0
                              ? "No class conducted"
                              : `${d.percent}%`}
                          </span>
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
