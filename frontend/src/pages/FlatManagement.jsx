import { useEffect, useState } from "react";
import API from "../services/api";

function FlatManagement() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingFlat, setEditingFlat] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    flatNumber: "",
    block: "",
    floor: "",
    ownerName: "",
    ownerEmail: "",
    status: "occupied",
  });

  // Fetch all flats
  const fetchFlats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/flats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlats(response.data.flats);
    } catch (error) {
      console.log("Failed to fetch flats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open Add Form
  const openAddForm = () => {
    setEditingFlat(null);

    setFormData({
      flatNumber: "",
      block: "",
      floor: "",
      ownerName: "",
      ownerEmail: "",
      status: "occupied",
    });

    setError("");
    setShowForm(true);
  };

  // Open Edit Form
  const openEditForm = (flat) => {
    setEditingFlat(flat);

    setFormData({
      flatNumber: flat.flatNumber,
      block: flat.block,
      floor: flat.floor,
      ownerName: flat.ownerName,
      ownerEmail: flat.ownerEmail,
      status: flat.status,
    });

    setError("");
    setShowForm(true);
  };

  // Add / Update Flat
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.flatNumber ||
      !formData.block ||
      formData.floor === "" ||
      !formData.ownerName ||
      !formData.ownerEmail
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingFlat) {
        // Update existing flat
        await API.put(
          `/flats/${editingFlat._id}`,
          {
            ...formData,
            floor: Number(formData.floor),
          },
          config
        );
      } else {
        // Add new flat
        await API.post(
          "/flats",
          {
            ...formData,
            floor: Number(formData.floor),
          },
          config
        );
      }

      setShowForm(false);
      setEditingFlat(null);

      setFormData({
        flatNumber: "",
        block: "",
        floor: "",
        ownerName: "",
        ownerEmail: "",
        status: "occupied",
      });

      await fetchFlats();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete Flat
  const handleDelete = async (flatId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flat?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/flats/${flatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchFlats();

    } catch (error) {
      console.log("Delete Flat Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to delete flat."
      );
    }
  };

  return (
    <div className="flat-management">

      {/* Page Header */}
      <div className="flat-page-header">

        <div>
          <h1>Flat Management</h1>

          <p>
            Manage apartment flats and residents.
          </p>
        </div>

        <button
          className="add-flat-button"
          onClick={openAddForm}
        >
          + Add Flat
        </button>

      </div>


      {/* Add / Edit Form */}
      {showForm && (
        <div className="flat-form-card">

          <div className="flat-form-header">

            <div>
              <h2>
                {editingFlat
                  ? "Edit Flat"
                  : "Add New Flat"}
              </h2>

              <p>
                {editingFlat
                  ? "Update flat and owner details."
                  : "Enter the flat and owner details."}
              </p>
            </div>

            <button
              className="close-form-button"
              onClick={() => {
                setShowForm(false);
                setEditingFlat(null);
              }}
            >
              ✕
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="flat-form-grid">

              <div className="flat-form-group">

                <label>Flat Number *</label>

                <input
                  type="text"
                  name="flatNumber"
                  placeholder="Example: A-101"
                  value={formData.flatNumber}
                  onChange={handleChange}
                />

              </div>


              <div className="flat-form-group">

                <label>Block *</label>

                <input
                  type="text"
                  name="block"
                  placeholder="Example: A"
                  value={formData.block}
                  onChange={handleChange}
                />

              </div>


              <div className="flat-form-group">

                <label>Floor *</label>

                <input
                  type="number"
                  name="floor"
                  placeholder="Example: 1"
                  value={formData.floor}
                  onChange={handleChange}
                />

              </div>


              <div className="flat-form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="occupied">
                    Occupied
                  </option>

                  <option value="vacant">
                    Vacant
                  </option>
                </select>

              </div>


              <div className="flat-form-group">

                <label>Owner Name *</label>

                <input
                  type="text"
                  name="ownerName"
                  placeholder="Enter owner name"
                  value={formData.ownerName}
                  onChange={handleChange}
                />

              </div>


              <div className="flat-form-group">

                <label>Owner Email *</label>

                <input
                  type="email"
                  name="ownerEmail"
                  placeholder="Enter owner email"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                />

              </div>

            </div>


            {error && (
              <div className="flat-error">
                {error}
              </div>
            )}


            <div className="flat-form-actions">

              <button
                type="button"
                className="cancel-flat-button"
                onClick={() => {
                  setShowForm(false);
                  setEditingFlat(null);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-flat-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingFlat
                  ? "Update Flat"
                  : "Add Flat"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Flats Table */}
      {loading ? (

        <div className="flat-loading">
          Loading flats...
        </div>

      ) : (

        <div className="flat-table-container">

          <table className="flat-table">

            <thead>

              <tr>
                <th>Flat Number</th>
                <th>Block</th>
                <th>Floor</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {flats.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="no-flats"
                  >
                    No flats found.
                  </td>

                </tr>

              ) : (

                flats.map((flat) => (

                  <tr key={flat._id}>

                    <td>
                      <strong>
                        {flat.flatNumber}
                      </strong>
                    </td>

                    <td>
                      {flat.block}
                    </td>

                    <td>
                      {flat.floor}
                    </td>

                    <td>
                      {flat.ownerName}
                    </td>

                    <td>
                      {flat.ownerEmail}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${flat.status}`}
                      >
                        {flat.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="edit-button"
                        onClick={() => openEditForm(flat)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(flat._id)}
                      >
                        Delete
                      </button>

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

export default FlatManagement;