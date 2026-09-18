import { useEffect, useState } from "react";
import API from "../services/api";

function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "general",
    createdBy: "Admin",
  });

  // =========================
  // GET NOTICES
  // =========================
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

      setNotices(response.data.notices || []);
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

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      category: "general",
      createdBy: "Admin",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================
  // CREATE / UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      if (editingId) {
        // UPDATE
        await API.put(
          `/notices/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Notice updated successfully!");
      } else {
        // CREATE
        await API.post(
          "/notices",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Notice created successfully!");
      }

      resetForm();
      fetchNotices();

    } catch (error) {
      console.log("Notice Save Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save notice"
      );
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (notice) => {
    setFormData({
      title: notice.title || "",
      message: notice.message || "",
      category: notice.category || "general",
      createdBy: notice.createdBy || "Admin",
    });

    setEditingId(notice._id);
    setShowForm(true);

    setMessage("");
    setError("");
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      await API.delete(`/notices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Notice deleted successfully!");

      fetchNotices();

    } catch (error) {
      console.log("Delete Notice Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete notice"
      );
    }
  };

  return (
    <div className="management-page">

      {/* =========================
          HEADER
      ========================= */}
      <div className="page-header">

        <div>
          <h1>Notice Management</h1>

          <p>
            Manage apartment notices and announcements.
          </p>
        </div>

        <div className="summary-card">

          <span>🔔</span>

          <div>
            <strong>{notices.length}</strong>

            <small>
              Total Notices
            </small>
          </div>

        </div>

      </div>

      {/* =========================
          ADD NOTICE BUTTON
      ========================= */}
      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);

            setFormData({
              title: "",
              message: "",
              category: "general",
              createdBy: "Admin",
            });

            setMessage("");
            setError("");
          }}
        >
          + Add Notice
        </button>

      </div>

      {/* =========================
          SUCCESS MESSAGE
      ========================= */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* =========================
          ERROR MESSAGE
      ========================= */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* =========================
          FORM
      ========================= */}
      {showForm && (

        <div className="form-container">

          <h2>
            {editingId
              ? "Edit Notice"
              : "Add Notice"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <div>
              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                required
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label>
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter notice message"
                rows="4"
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="general">
                  General
                </option>

                <option value="maintenance">
                  Maintenance
                </option>

                <option value="event">
                  Event
                </option>

                <option value="emergency">
                  Emergency
                </option>
              </select>
            </div>

            {/* CREATED BY */}
            <div>
              <label>
                Created By
              </label>

              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                required
              />
            </div>

            {/* BUTTONS */}
            <div style={{ marginTop: "15px" }}>

              <button type="submit">
                {editingId
                  ? "Update Notice"
                  : "Add Notice"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}
      {loading && (
        <div className="loading-message">
          Loading notices...
        </div>
      )}

      {/* =========================
          EMPTY
      ========================= */}
      {!loading &&
        !error &&
        notices.length === 0 && (
          <div className="empty-message">
            No notices found.
          </div>
        )}

      {/* =========================
          NOTICE LIST
      ========================= */}
      {!loading &&
        !error &&
        notices.length > 0 && (

          <div className="notice-grid">

            {notices.map((notice) => (

              <div
                className="notice-card"
                key={notice._id}
              >

                <div className="notice-card-header">

                  <h2>
                    {notice.title}
                  </h2>

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
                    Created by:{" "}
                    {notice.createdBy}
                  </span>

                  <span>
                    {notice.date
                      ? new Date(
                          notice.date
                        ).toLocaleDateString()
                      : ""}
                  </span>

                </div>

                {/* ACTION BUTTONS */}
                <div
                  style={{
                    marginTop: "15px",
                  }}
                >

                  <button
                    onClick={() =>
                      handleEdit(notice)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(notice._id)
                    }
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

    </div>
  );
}

export default NoticeManagement;