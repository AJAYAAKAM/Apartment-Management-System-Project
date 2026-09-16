import { useEffect, useState } from "react";

function SecurityDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="security-dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Security Dashboard</h1>

          <p>
            Welcome back, {user?.name || "Security"} 👋
          </p>
        </div>

        <div className="profile">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "S"}
          </div>

          <div>
            <strong>{user?.name || "Security"}</strong>
            <span>Security Staff</span>
          </div>

        </div>

      </header>

      <main className="dashboard-content">

        <section className="dashboard-cards">

          <div className="dashboard-card">
            <span>👥</span>
            <h3>Visitors</h3>
            <p>Manage visitor entries</p>
          </div>

          <div className="dashboard-card">
            <span>🚗</span>
            <h3>Parking</h3>
            <p>Check parking information</p>
          </div>

          <div className="dashboard-card">
            <span>📋</span>
            <h3>Visitor History</h3>
            <p>View previous visitor records</p>
          </div>

          <div className="dashboard-card">
            <span>📢</span>
            <h3>Notices</h3>
            <p>View apartment notices</p>
          </div>

        </section>

        <section className="dashboard-section">

          <h2>Today's Visitor Activity</h2>

          <div className="notice-box">

            <h3>No visitor records yet</h3>

            <p>
              Visitor entries and security activity
              will appear here.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SecurityDashboard;