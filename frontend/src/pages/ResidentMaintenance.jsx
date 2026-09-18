
import { useEffect, useState } from "react";
import API from "../services/api";

function ResidentMaintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMaintenance = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/maintenance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMaintenance(response.data.maintenance || []);
    } catch (error) {
      console.log("Fetch Maintenance Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch maintenance records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenance();
  }, []);

  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>My Maintenance</h1>
          <p>View your apartment maintenance bills.</p>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          Loading maintenance records...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && maintenance.length === 0 && (
        <div className="empty-message">
          No maintenance records found.
        </div>
      )}

      {!loading && !error && maintenance.length > 0 && (
        <div className="table-container">
          <table className="management-table">
            <thead>
              <tr>
                <th>Flat Number</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {maintenance.map((record) => (
                <tr key={record._id}>

                  <td>
                    <strong>
                      {record.flatNumber}
                    </strong>
                  </td>

                  <td>
                    ₹{record.amount}
                  </td>

                  <td>
                    {record.dueDate
                      ? new Date(
                          record.dueDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${record.status}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td>
                    {record.description || "-"}
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

export default ResidentMaintenance;

