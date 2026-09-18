import { useEffect, useState } from "react";
import API from "../services/api";

function VisitorManagement() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    visitorName: "",
    phone: "",
    flatNumber: "",
    purpose: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVisitor = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      await API.post("/visitors", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Visitor entry added successfully.");

      setFormData({
        visitorName: "",
        phone: "",
        flatNumber: "",
        purpose: "",
      });

      setShowForm(false);

      fetchVisitors();
    } catch (error) {
      console.log("Add Visitor Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add visitor"
      );
    }
  };

  const handleMarkExit = async (visitorId) => {
    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      await API.put(
        `/visitors/${visitorId}/exit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Visitor exit marked successfully.");

      fetchVisitors();
    } catch (error) {
      console.log("Mark Exit Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to mark visitor exit"
      );
    }
  };

  return (
    <div className="management-page">

      {/* ================= HEADER ================= */}

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


      {/* ================= ADD BUTTON ================= */}

      <div className="visitor-action-bar">

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setMessage("");
            setError("");
          }}
        >
          {showForm
            ? "✕ Close Form"
            : "➕ Add Visitor"}
        </button>

      </div>


      {/* ================= MESSAGES ================= */}

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


      {/* ================= ADD VISITOR FORM ================= */}

      {showForm && (
        <div className="form-container">

          <h2>
            Add Visitor Entry
          </h2>

          <form onSubmit={handleAddVisitor}>

            <div className="form-group">

              <label>
                Visitor Name
              </label>

              <input
                type="text"
                name="visitorName"
                value={formData.visitorName}
                onChange={handleChange}
                placeholder="Enter visitor name"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Flat Number
              </label>

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

              <label>
                Purpose of Visit
              </label>

              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Example: Meeting resident"
                required
              />

            </div>


            <button type="submit">
              Add Visitor Entry
            </button>

          </form>

        </div>
      )}


      {/* ================= LOADING ================= */}

      {loading && (
        <div className="loading-message">
          Loading visitors...
        </div>
      )}


      {/* ================= EMPTY ================= */}

      {!loading &&
        !error &&
        visitors.length === 0 && (
          <div className="empty-message">
            No visitors found.
          </div>
        )}


      {/* ================= VISITOR TABLE ================= */}

      {!loading &&
        !error &&
        visitors.length > 0 && (

          <div className="table-container">

            <table className="management-table">

              <thead>

                <tr>
                  <th>Visitor</th>
                  <th>Phone</th>
                  <th>Flat</th>
                  <th>Purpose</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                  <th>Status</th>
                  <th>Action</th>
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
                      {visitor.exitTime
                        ? new Date(
                            visitor.exitTime
                          ).toLocaleString()
                        : "-"}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${visitor.status}`}
                      >
                        {visitor.status}
                      </span>

                    </td>

                    <td>

                      {visitor.status === "inside" ? (

                        <button
                          type="button"
                          onClick={() =>
                            handleMarkExit(visitor._id)
                          }
                        >
                          🚪 Mark Exit
                        </button>

                      ) : (

                        <span>
                          ✓ Exited
                        </span>

                      )}

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