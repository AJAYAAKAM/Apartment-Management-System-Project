import { useEffect, useState } from "react";
import API from "../services/api";

function ComplaintManagement() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(response.data.complaints);
    } catch (error) {
      console.log("Fetch Complaints Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/complaints/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (error) {
      console.log("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update complaint status"
      );
    }
  };

  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>Complaint Management</h1>
          <p>
            Manage resident complaints and update their status.
          </p>
        </div>

        <div className="summary-card">
          <span>📋</span>
          <div>
            <strong>{complaints.length}</strong>
            <small>Total Complaints</small>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          Loading complaints...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && complaints.length === 0 && (
        <div className="empty-message">
          No complaints found.
        </div>
      )}

      {!loading && !error && complaints.length > 0 && (
        <div className="table-container">

          <table className="management-table">

            <thead>
              <tr>
                <th>Resident</th>
                <th>Flat</th>
                <th>Complaint</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>

                  <td>
                    <strong>{complaint.residentName}</strong>
                    <br />
                    <small>{complaint.residentEmail}</small>
                  </td>

                  <td>{complaint.flatNumber}</td>

                  <td>
                    <strong>{complaint.title}</strong>
                    <br />
                    <small>{complaint.description}</small>
                  </td>

                  <td>
                    <span
                      className={`priority-badge ${complaint.priority}`}
                    >
                      {complaint.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${complaint.status}`}
                    >
                      {complaint.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="resolved">
                        Resolved
                      </option>
                    </select>
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

export default ComplaintManagement;