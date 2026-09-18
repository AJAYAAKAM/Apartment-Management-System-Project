
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResidentDashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to load user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="resident-dashboard">

      {/* Header */}
      <header className="dashboard-header">

        <div>
          <h1>Resident Dashboard</h1>

          <p>
            Welcome back, {user?.name || "Resident"} 👋
          </p>
        </div>

        {/* Resident Profile */}
        <div className="profile">

          <div className="profile-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "R"}
          </div>

          <div>
            <strong>
              {user?.name || "Resident"}
            </strong>

            <span>
              Resident
            </span>

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

      </header>


      {/* Dashboard Content */}
      <main className="dashboard-content">

        {/* Dashboard Cards */}
        <section className="dashboard-cards">

          {/* My Flat */}
          <div
            className="dashboard-card"
            onClick={() => navigate("/resident/flat")}
            style={{ cursor: "pointer" }}
          >
            <span>🏠</span>

            <h3>My Flat</h3>

            <p>
              View your flat information
            </p>
          </div>


          {/* Maintenance */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/resident/maintenance")
            }
            style={{ cursor: "pointer" }}
          >
            <span>💰</span>

            <h3>Maintenance</h3>

            <p>
              View maintenance bills
            </p>
          </div>


          {/* Complaints */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/resident/complaints/add")
            }
            style={{ cursor: "pointer" }}
          >
            <span>📝</span>

            <h3>Complaints</h3>

            <p>
              Submit and manage complaints
            </p>
          </div>


          {/* Visitors */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/resident/visitors")
            }
            style={{ cursor: "pointer" }}
          >
            <span>👥</span>

            <h3>Visitors</h3>

            <p>
              View visitor records
            </p>
          </div>


          {/* Parking */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/resident/parking")
            }
            style={{ cursor: "pointer" }}
          >
            <span>🚗</span>

            <h3>Parking</h3>

            <p>
              View parking information
            </p>
          </div>


          {/* Notices */}
          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/resident/notices")
            }
            style={{ cursor: "pointer" }}
          >
            <span>📋</span>

            <h3>Notices</h3>

            <p>
              View apartment notices
            </p>
          </div>

        </section>


        {/* Recent Notices */}
        <section className="dashboard-section">

          <h2>
            Recent Notices
          </h2>

          <div className="notice-box">

            <h3>
              Welcome to Apartment Management System
            </h3>

            <p>
              Important apartment notices and
              announcements will appear here.
            </p>

          </div>

        </section>


        {/* Account */}
        <section className="dashboard-section">

          <h2>
            Account
          </h2>

          <div className="notice-box">

            <h3>
              {user?.name || "Resident"}
            </h3>

            <p>
              {user?.email || "Resident account"}
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ResidentDashboard;

