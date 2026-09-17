import { useEffect, useState } from "react";
import API from "../services/api";

function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/notices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotices(response.data.notices);
    } catch (error) {
      console.log("Fetch Notices Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch notices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>Notice Management</h1>

          <p>
            View important apartment notices and announcements.
          </p>
        </div>

        <div className="summary-card">
          <span>🔔</span>

          <div>
            <strong>{notices.length}</strong>
            <small>Total Notices</small>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          Loading notices...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && notices.length === 0 && (
        <div className="empty-message">
          No notices found.
        </div>
      )}

      {!loading && !error && notices.length > 0 && (
        <div className="notice-grid">

          {notices.map((notice) => (
            <div
              className="notice-card"
              key={notice._id}
            >
              <div className="notice-card-header">
                <h2>{notice.title}</h2>

                <span
                  className={`status-badge ${notice.category}`}
                >
                  {notice.category}
                </span>
              </div>

              <p className="notice-message">
                {notice.message}
              </p>

              <div className="notice-footer">
                <span>
                  Created by: {notice.createdBy}
                </span>

                <span>
                  {new Date(
                    notice.date
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default NoticeManagement;