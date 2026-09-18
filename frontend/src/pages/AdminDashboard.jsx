import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Manage your apartment from one place.
          </p>
        </div>

        <div className="admin-profile">

          <span>👤</span>

          <div>
            <strong>Admin</strong>
            <small>Administrator</small>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginTop: "10px",
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Logout
            </button>
          </div>

        </div>

      </div>


      {/* Dashboard Cards */}
      <div className="dashboard-grid">

        {/* Residents */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/residents")}
        >
          <span>👥</span>

          <h3>Residents</h3>

          <p>
            Manage apartment residents
          </p>
        </div>


        {/* Flats */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/flats")}
        >
          <span>🏠</span>

          <h3>Flats</h3>

          <p>
            Manage apartment flats
          </p>
        </div>


        {/* Maintenance */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/maintenance")}
        >
          <span>💰</span>

          <h3>Maintenance</h3>

          <p>
            Manage maintenance payments
          </p>
        </div>


        {/* Complaints */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/complaints")}
        >
          <span>📢</span>

          <h3>Complaints</h3>

          <p>
            Manage resident complaints
          </p>
        </div>


        {/* Visitors */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/visitors")}
        >
          <span>👥</span>

          <h3>Visitors</h3>

          <p>
            Manage apartment visitors
          </p>
        </div>


        {/* Parking */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/parking")}
        >
          <span>🚗</span>

          <h3>Parking</h3>

          <p>
            Manage parking spaces
          </p>
        </div>


        {/* Notices */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/notices")}
        >
          <span>📋</span>

          <h3>Notices</h3>

          <p>
            Manage apartment notices
          </p>
        </div>

      </div>


      {/* Overview */}
      <div className="dashboard-overview">

        <div className="overview-card">

          <span>🏢</span>

          <div>

            <h3>
              Apartment Management
            </h3>

            <p>
              Manage residents, flats, maintenance,
              complaints, visitors, parking and notices
              efficiently.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;