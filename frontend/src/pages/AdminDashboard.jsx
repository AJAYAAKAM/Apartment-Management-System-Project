import { useEffect, useState } from "react";

function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="admin-dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Welcome back, {user?.name || "Admin"} 👋
          </p>
        </div>

        <div className="profile">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          <div>
            <strong>{user?.name || "Admin"}</strong>
            <span>Administrator</span>
          </div>

        </div>

      </header>

      <main className="dashboard-content">

        <section className="dashboard-cards">

          <div className="dashboard-card">
            <span>👥</span>
            <h3>Residents</h3>
            <p>Manage apartment residents</p>
          </div>

          <div className="dashboard-card">
            <span>🏠</span>
            <h3>Flats</h3>
            <p>Manage flat information</p>
          </div>

          <div className="dashboard-card">
            <span>💰</span>
            <h3>Maintenance</h3>
            <p>Manage maintenance payments</p>
          </div>

          <div className="dashboard-card">
            <span>📝</span>
            <h3>Complaints</h3>
            <p>View and manage complaints</p>
          </div>

          <div className="dashboard-card">
            <span>🚗</span>
            <h3>Parking</h3>
            <p>Manage parking information</p>
          </div>

          <div className="dashboard-card">
            <span>📢</span>
            <h3>Notices</h3>
            <p>Create apartment notices</p>
          </div>

        </section>

        <section className="dashboard-section">

          <h2>Apartment Overview</h2>

          <div className="notice-box">
            <h3>Apartment Management System</h3>

            <p>
              Use the dashboard to manage residents, flats,
              maintenance, complaints, visitors, parking and notices.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;