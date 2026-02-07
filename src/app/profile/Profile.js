import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BatchContext from "../../context/batch/BatchContext";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { activeBatch } = useContext(BatchContext);

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Dr. Evelyn Reed",
    email: "teacher@example.com",
    department: "Computer Science",
    institution: "ABC Institute of Technology",
    role: "Teacher",
    avatar: "https://i.pravatar.cc/150",
  });

  const [preferences, setPreferences] = useState({
    defaultMode: "manual",
    threshold: 75,
  });

  const handleSave = () => {
    console.log("Profile:", profile);
    console.log("Preferences:", preferences);
  };

  const handleBackToDashboard = () => {
    if (activeBatch) {
      navigate(`/user/${activeBatch.id}/dashboard`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container-fluid profile-page">
      <div className="profile-layout">
        {/* SIDE PANEL */}
        <aside className="profile-sidebar">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          <button
            className={activeTab === "preferences" ? "active" : ""}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>

          <button
            className={activeTab === "activity" ? "active" : ""}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </aside>

        {/* CONTENT */}
        <section className="profile-content">
          {activeTab === "profile" && (
            <>
              <h2>My Profile</h2>
              <p className="text-muted">Update your personal information.</p>

              <div className="avatar-section">
                <img src={profile.avatar} alt="profile" />
                <label className="avatar-upload-btn">
                  Change Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setProfile((p) => ({
                        ...p,
                        avatar: URL.createObjectURL(file),
                      }));
                    }}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input value={profile.email} disabled />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input value={profile.role} disabled />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  value={profile.department}
                  onChange={(e) =>
                    setProfile({ ...profile, department: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Institution</label>
                <input
                  value={profile.institution}
                  onChange={(e) =>
                    setProfile({ ...profile, institution: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-outline-secondary mx-2"
                onClick={handleBackToDashboard}
              >
                Back to dashboard
              </button>
              <button className="btn btn-primary mx-2" onClick={handleSave}>
                Save Changes
              </button>
            </>
          )}

          {activeTab === "preferences" && (
            <>
              <h2>Preferences</h2>
              <p className="text-muted">Default settings for new batches.</p>

              <div className="form-group">
                <label>Default Attendance Mode</label>
                <select
                  value={preferences.defaultMode}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      defaultMode: e.target.value,
                    })
                  }
                >
                  <option value="manual">Manual</option>
                  <option value="auto">Automatic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Attendance Warning Threshold (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={preferences.threshold}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      threshold: Number(e.target.value),
                    })
                  }
                />
              </div>

              <button
                className="btn btn-outline-secondary mx-2"
                onClick={handleBackToDashboard}
              >
                Back to dashboard
              </button>

              <button className="btn btn-primary" onClick={handleSave}>
                Save Preferences
              </button>
            </>
          )}

          {activeTab === "activity" && (
            <>
              <h2>Activity</h2>
              <p className="text-muted">Your usage summary.</p>

              <div className="activity-card">
                <p>
                  <strong>Last Active Batch:</strong>{" "}
                  {activeBatch ? activeBatch.name : "None"}
                </p>
                <p>
                  <strong>Batches Managed:</strong> 2
                </p>
                <p>
                  <strong>Total Students:</strong> 84
                </p>
                <p>
                  <strong>Average Attendance:</strong> 87%
                </p>
              </div>

              <button
                className="btn btn-outline-secondary mx-2"
                onClick={handleBackToDashboard}
              >
                Back to dashboard
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
