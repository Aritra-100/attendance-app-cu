import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./app/layout/Layout";
import Dashboard from "./app/dashboard/Dashboard";
import Attendance from "./app/attendance/Attendance";
import Students from "./app/students/Students";
import Reports from "./app/reports/Reports";
import Lectures from "./app/lectures/Lectures";
import Alert from "./components/alert/Alert";
import Profile from "./app/profile/Profile";
import { AuthProvider } from "./context/auth/AuthContext";
import JoinBatch from "./app/student/JoinBatch";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./app/student/StudentBoard";
function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Layout wraps EVERYTHING */}
        <Route element={<Layout />}>
          {/* Empty state (no batch selected) */}
          <Route path="/" element={null} />
          <Route path="/join" element={<JoinBatch />} />

          <Route
          path="/user/:batchId/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
          />
          {/* Batch routes */}
          <Route path="/user/:batchId">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="students" element={<Students />} />
            <Route path="reports" element={<Reports />} />
            <Route path="lectures" element={<Lectures />} />
          </Route>
        </Route>

        {/* PROFILE ROUTE */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
