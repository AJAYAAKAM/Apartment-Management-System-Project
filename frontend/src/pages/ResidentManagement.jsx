import { useEffect, useState } from "react";
import API from "../services/api";

function ResidentManagement() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch Residents
  const fetchResidents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/residents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResidents(response.data.residents);

    } catch (error) {
      console.log("Failed to fetch residents:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load residents."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open Add Form
  const openAddForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setError("");
    setShowForm(true);
  };

  // Add Resident
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await API.post(
        "/residents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowForm(false);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      await fetchResidents();

    } catch (error) {
      console.log("Add Resident Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to add resident."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="resident-management">

      {/* Header */}
      <div className="resident-page-header">

        <div>
          <h1>Resident Management</h1>

          <p>
            Manage apartment residents and their information.
          </p>
        </div>

        <div className="resident-header-right">

          <div className="resident-count">
            <span>{residents.length}</span>
            <small>Total Residents</small>
          </div>

          <button
            className="add-resident-button"
            onClick={openAddForm}
          >
            + Add Resident
          </button>

        </div>

      </div>


      {/* Add Resident Form */}
      {showForm && (
        <div className="resident-form-card">

          <div className="resident-form-header">

            <div>
              <h2>Add New Resident</h2>

              <p>
                Enter the resident account details.
              </p>
            </div>

            <button
              className="close-resident-button"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="resident-form-grid">

              <div className="resident-form-group">

                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter resident name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="resident-form-group">

                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              <div className="resident-form-group">

                <label>Password *</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter temporary password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

            </div>


            {error && (
              <div className="resident-error">
                {error}
              </div>
            )}


            <div className="resident-form-actions">

              <button
                type="button"
                className="cancel-resident-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-resident-button"
                disabled={saving}
              >
                {saving
                  ? "Adding..."
                  : "Add Resident"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Residents Table */}
      {loading ? (

        <div className="resident-loading">
          Loading residents...
        </div>

      ) : (

        <div className="resident-table-container">

          <table className="resident-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {residents.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="no-residents"
                  >
                    No residents found.
                  </td>

                </tr>

              ) : (

                residents.map((resident) => (

                  <tr key={resident._id}>

                    <td>

                      <div className="resident-name">

                        <div className="resident-avatar">
                          {resident.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {resident.name}
                        </strong>

                      </div>

                    </td>

                    <td>
                      {resident.email}
                    </td>

                    <td>

                      <span className="resident-role">
                        Resident
                      </span>

                    </td>

                    <td>
                      {new Date(
                        resident.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <span className="resident-status">
                        Active
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default ResidentManagement;