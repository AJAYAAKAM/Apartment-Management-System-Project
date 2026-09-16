import { useEffect, useState } from "react";
import API from "../services/api";

function MaintenanceManagement() {
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    flatNumber: "",
    residentName: "",
    residentEmail: "",
    amount: "",
    dueDate: "",
    status: "pending",
    description: "Monthly Maintenance",
  });

  // Fetch maintenance bills
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

      setMaintenance(response.data.maintenance);
    } catch (error) {
      console.log("Failed to fetch maintenance:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load maintenance bills."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenance();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open add form
  const openForm = () => {
    setFormData({
      flatNumber: "",
      residentName: "",
      residentEmail: "",
      amount: "",
      dueDate: "",
      status: "pending",
      description: "Monthly Maintenance",
    });

    setError("");
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setError("");
  };

  // Add maintenance bill
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.flatNumber ||
      !formData.residentName ||
      !formData.residentEmail ||
      !formData.amount ||
      !formData.dueDate
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await API.post(
        "/maintenance",
        {
          ...formData,
          amount: Number(formData.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowForm(false);

      setFormData({
        flatNumber: "",
        residentName: "",
        residentEmail: "",
        amount: "",
        dueDate: "",
        status: "pending",
        description: "Monthly Maintenance",
      });

      await fetchMaintenance();
    } catch (error) {
      console.log("Add Maintenance Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add maintenance bill."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="maintenance-management">

      {/* Header */}
      <div className="maintenance-page-header">

        <div>
          <h1>Maintenance Management</h1>

          <p>
            Manage apartment maintenance bills and payments.
          </p>
        </div>

        <div className="maintenance-header-actions">

          <div className="maintenance-count">
            <span>{maintenance.length}</span>
            <small>Total Bills</small>
          </div>

          <button
            type="button"
            className="add-maintenance-button"
            onClick={openForm}
          >
            + Add Bill
          </button>

        </div>

      </div>


      {/* Error Message */}
      {error && (
        <div className="maintenance-error">
          {error}
        </div>
      )}


      {/* Add Maintenance Form */}
      {showForm && (
        <div className="maintenance-form-card">

          <div className="maintenance-form-header">

            <div>
              <h2>Add Maintenance Bill</h2>

              <p>
                Enter the maintenance bill details.
              </p>
            </div>

            <button
              type="button"
              className="close-form-button"
              onClick={closeForm}
            >
              ×
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="maintenance-form-grid">

              {/* Flat Number */}
              <div className="maintenance-form-group">

                <label>Flat Number *</label>

                <input
                  type="text"
                  name="flatNumber"
                  placeholder="Example: A-102"
                  value={formData.flatNumber}
                  onChange={handleChange}
                />

              </div>


              {/* Resident Name */}
              <div className="maintenance-form-group">

                <label>Resident Name *</label>

                <input
                  type="text"
                  name="residentName"
                  placeholder="Enter resident name"
                  value={formData.residentName}
                  onChange={handleChange}
                />

              </div>


              {/* Resident Email */}
              <div className="maintenance-form-group">

                <label>Resident Email *</label>

                <input
                  type="email"
                  name="residentEmail"
                  placeholder="Enter resident email"
                  value={formData.residentEmail}
                  onChange={handleChange}
                />

              </div>


              {/* Amount */}
              <div className="maintenance-form-group">

                <label>Amount *</label>

                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  min="0"
                  value={formData.amount}
                  onChange={handleChange}
                />

              </div>


              {/* Due Date */}
              <div className="maintenance-form-group">

                <label>Due Date *</label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />

              </div>


              {/* Status */}
              <div className="maintenance-form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="paid">
                    Paid
                  </option>
                </select>

              </div>


              {/* Description */}
              <div className="maintenance-form-group full-width">

                <label>Description</label>

                <input
                  type="text"
                  name="description"
                  placeholder="Example: November Monthly Maintenance"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Form Buttons */}
            <div className="maintenance-form-actions">

              <button
                type="button"
                className="cancel-maintenance-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-maintenance-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Add Maintenance Bill"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Loading */}
      {loading ? (

        <div className="maintenance-loading">
          Loading maintenance bills...
        </div>

      ) : (

        <div className="maintenance-table-container">

          <table className="maintenance-table">

            <thead>

              <tr>
                <th>Flat</th>
                <th>Resident</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Description</th>
              </tr>

            </thead>

            <tbody>

              {maintenance.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="no-maintenance"
                  >
                    No maintenance bills found.
                  </td>

                </tr>

              ) : (

                maintenance.map((bill) => (

                  <tr key={bill._id}>

                    <td>
                      <strong>
                        {bill.flatNumber}
                      </strong>
                    </td>

                    <td>
                      {bill.residentName}
                    </td>

                    <td>
                      {bill.residentEmail}
                    </td>

                    <td>
                      ₹{bill.amount}
                    </td>

                    <td>
                      {new Date(
                        bill.dueDate
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <span
                        className={`maintenance-status ${bill.status}`}
                      >
                        {bill.status}
                      </span>

                    </td>

                    <td>
                      {bill.description}
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

export default MaintenanceManagement;