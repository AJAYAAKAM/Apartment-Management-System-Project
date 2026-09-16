import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResidentDashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="resident-dashboard">

      <header className="dashboard-header">
        <div>
          <h1>Resident Dashboard</h1>

          <p>
            Welcome back, {user?.name || "Resident"} 👋
          </p>
        </div>

        <div className="profile">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "R"}
          </div>

          <div>
            <strong>{user?.name || "Resident"}</strong>
            <span>Resident</span>
          </div>
        </div>
      </header>

      <main className="dashboard-content">

        <section className="dashboard-cards">

          <div className="dashboard-card">
            <span>🏠</span>
            <h3>My Flat</h3>
            <p>Flat information</p>
          </div>

          <div className="dashboard-card">
            <span>💰</span>
            <h3>Maintenance</h3>
            <p>View maintenance bills</p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/resident/complaints/add")
            }
            style={{ cursor: "pointer" }}
          >
            <span>📝</span>
            <h3>Complaints</h3>
            <p>Submit and manage your complaints</p>
          </div>

          <div className="dashboard-card">
            <span>👥</span>
            <h3>Visitors</h3>
            <p>View visitor records</p>
          </div>

        </section>

        <section className="dashboard-section">

          <h2>Recent Notices</h2>

          <div className="notice-box">
            <h3>
              Welcome to Apartment Management System
            </h3>

            <p>
              Important apartment notices will appear here.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default ResidentDashboard;