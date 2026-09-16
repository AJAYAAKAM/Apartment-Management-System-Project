import { useEffect, useState } from "react";
import API from "../services/api";

function VisitorManagement() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/visitors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVisitors(response.data.visitors);
    } catch (error) {
      console.log("Fetch Visitors Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch visitors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>Visitor Management</h1>

          <p>
            Manage apartment visitor records and entry details.
          </p>
        </div>

        <div className="summary-card">
          <span>👥</span>

          <div>
            <strong>{visitors.length}</strong>
            <small>Total Visitors</small>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          Loading visitors...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && visitors.length === 0 && (
        <div className="empty-message">
          No visitors found.
        </div>
      )}

      {!loading && !error && visitors.length > 0 && (
        <div className="table-container">

          <table className="management-table">

            <thead>
              <tr>
                <th>Visitor</th>
                <th>Phone</th>
                <th>Flat</th>
                <th>Purpose</th>
                <th>Entry Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {visitors.map((visitor) => (
                <tr key={visitor._id}>

                  <td>
                    <strong>
                      {visitor.visitorName}
                    </strong>
                  </td>

                  <td>
                    {visitor.phone}
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

    </div>
  );
}

export default VisitorManagement;