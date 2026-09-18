import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SecurityDashboard() {
  const [user, setUser] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [visitorLoading, setVisitorLoading] = useState(true);

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

  const fetchVisitors = async () => {
    try {
      setVisitorLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.get("/visitors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVisitors(response.data.visitors || []);
    } catch (error) {
      console.log("Fetch Visitor Activity Error:", error);
    } finally {
      setVisitorLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================================================
  // TODAY'S VISITORS
  // =========================================================

  const today = new Date();

  const todaysVisitors = visitors.filter((visitor) => {
    if (!visitor.entryTime) {
      return false;
    }

    const entryDate = new Date(visitor.entryTime);

    return (
      entryDate.getDate() === today.getDate() &&
      entryDate.getMonth() === today.getMonth() &&
      entryDate.getFullYear() === today.getFullYear()
    );
  });

  const currentlyInside = todaysVisitors.filter(
    (visitor) => visitor.status === "inside"
  );

  const exitedVisitors = todaysVisitors.filter(
    (visitor) => visitor.status === "exited"
  );

  return (
    <div className="security-dashboard">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="dashboard-header">

        <div>
          <h1>Security Dashboard</h1>

          <p>
            Welcome back, {user?.name || "Security"} 👋
          </p>
        </div>

        <div className="profile">

          <div className="profile-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div>
            <strong>
              {user?.name || "Security"}
            </strong>

            <span>
              Security Staff
            </span>
          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="dashboard-content">


        {/* ===================================================
            DASHBOARD CARDS
            =================================================== */}

        <section className="dashboard-cards">

          {/* Visitors */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/security/visitors")
            }
            style={{ cursor: "pointer" }}
          >
            <span>👥</span>

            <h3>
              Visitors
            </h3>

            <p>
              Manage visitor entries
            </p>
          </div>


          {/* Parking */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/security/parking")
            }
            style={{ cursor: "pointer" }}
          >
            <span>🚗</span>

            <h3>
              Parking
            </h3>

            <p>
              Check parking information
            </p>
          </div>


          {/* Visitor History */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/security/visitors")
            }
            style={{ cursor: "pointer" }}
          >
            <span>📋</span>

            <h3>
              Visitor History
            </h3>

            <p>
              View previous visitor records
            </p>
          </div>


          {/* Notices */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/security/notices")
            }
            style={{ cursor: "pointer" }}
          >
            <span>📢</span>

            <h3>
              Notices
            </h3>

            <p>
              View apartment notices
            </p>
          </div>

        </section>


        {/* ===================================================
            TODAY'S SUMMARY
            =================================================== */}

        <section className="dashboard-section">

          <h2>
            Today's Visitor Activity
          </h2>


          <div className="dashboard-cards">

            {/* Total */}

            <div className="dashboard-card">

              <span>👥</span>

              <h3>
                {visitorLoading
                  ? "..."
                  : todaysVisitors.length}
              </h3>

              <p>
                Today's Visitors
              </p>

            </div>


            {/* Inside */}

            <div className="dashboard-card">

              <span>🟢</span>

              <h3>
                {visitorLoading
                  ? "..."
                  : currentlyInside.length}
              </h3>

              <p>
                Currently Inside
              </p>

            </div>


            {/* Exited */}

            <div className="dashboard-card">

              <span>🚪</span>

              <h3>
                {visitorLoading
                  ? "..."
                  : exitedVisitors.length}
              </h3>

              <p>
                Visitors Exited
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            RECENT VISITORS
            =================================================== */}

        <section className="dashboard-section">

          <h2>
            Recent Visitors
          </h2>

          {visitorLoading ? (

            <div className="notice-box">

              <h3>
                Loading visitor activity...
              </h3>

              <p>
                Please wait while visitor records
                are being loaded.
              </p>

            </div>

          ) : todaysVisitors.length === 0 ? (

            <div className="notice-box">

              <h3>
                No visitors today
              </h3>

              <p>
                No visitor entries have been recorded
                today.
              </p>

            </div>

          ) : (

            <div className="table-container">

              <table className="management-table">

                <thead>

                  <tr>
                    <th>Visitor</th>
                    <th>Flat</th>
                    <th>Purpose</th>
                    <th>Entry Time</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {todaysVisitors
                    .slice(0, 5)
                    .map((visitor) => (

                      <tr key={visitor._id}>

                        <td>
                          <strong>
                            {visitor.visitorName}
                          </strong>
                        </td>

                        <td>
                          {visitor.flatNumber}
                        </td>

                        <td>
                          {visitor.purpose}
                        </td>

                        <td>
                          {new Date(
                            visitor.entryTime
                          ).toLocaleString()}
                        </td>

                        <td>

                          <span
                            className={`status-badge ${visitor.status}`}
                          >
                            {visitor.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ===================================================
            SECURITY ACCOUNT
            =================================================== */}

        <section className="dashboard-section">

          <h2>
            Security Account
          </h2>

          <div className="notice-box">

            <h3>
              {user?.name || "Security"}
            </h3>

            <p>
              {user?.email || "Security account"}
            </p>

            <p>
              Role: Security Staff
            </p>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginTop: "15px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SecurityDashboard;