import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your apartment from one place.</p>
        </div>

        <div className="admin-profile">
          <span>👤</span>
          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/residents")}
        >
          <span>👥</span>
          <h3>Residents</h3>
          <p>Manage apartment residents</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/flats")}
        >
          <span>🏠</span>
          <h3>Flats</h3>
          <p>Manage apartment flats</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/maintenance")}
        >
          <span>💰</span>
          <h3>Maintenance</h3>
          <p>Manage maintenance payments</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/complaints")}
        >
          <span>📢</span>
          <h3>Complaints</h3>
          <p>Manage resident complaints</p>
        </div>

        <div className="dashboard-card">
          <span>🚗</span>
          <h3>Parking</h3>
          <p>Manage parking spaces</p>
        </div>

        <div className="dashboard-card">
          <span>📋</span>
          <h3>Notices</h3>
          <p>Manage apartment notices</p>
        </div>

      </div>

      <div className="dashboard-overview">
        <div className="overview-card">
          <span>🏢</span>

          <div>
            <h3>Apartment Management</h3>
            <p>
              Manage residents, flats, maintenance,
              complaints, parking and notices efficiently.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;