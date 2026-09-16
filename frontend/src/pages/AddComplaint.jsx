import { useState } from "react";
import API from "../services/api";

function AddComplaint() {
  const [formData, setFormData] = useState({
    residentName: "",
    residentEmail: "",
    flatNumber: "",
    title: "",
    description: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      await API.post(
        "/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Complaint submitted successfully!");

      setFormData({
        residentName: "",
        residentEmail: "",
        flatNumber: "",
        title: "",
        description: "",
        priority: "medium",
      });

    } catch (error) {
      console.log("Add Complaint Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>Submit Complaint</h1>
          <p>
            Report an issue to the apartment administration.
          </p>
        </div>
      </div>

      <div className="form-container">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Resident Name</label>
            <input
              type="text"
              name="residentName"
              value={formData.residentName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Resident Email</label>
            <input
              type="email"
              name="residentEmail"
              value={formData.residentEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Flat Number</label>
            <input
              type="text"
              name="flatNumber"
              value={formData.flatNumber}
              onChange={handleChange}
              placeholder="Example: A-101"
              required
            />
          </div>

          <div className="form-group">
            <label>Complaint Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Water Leakage"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint..."
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddComplaint;