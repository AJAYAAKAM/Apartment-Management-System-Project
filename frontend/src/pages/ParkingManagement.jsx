import { useEffect, useState } from "react";
import API from "../services/api";

function ParkingManagement() {
  const [parking, setParking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "car",
    flatNumber: "",
    parkingSlot: "",
    status: "occupied",
  });

  // ===============================
  // FETCH PARKING RECORDS
  // ===============================

  const fetchParking = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/parking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setParking(response.data.parking);
    } catch (error) {
      console.log("Fetch Parking Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch parking records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParking();
  }, []);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // RESET FORM
  // ===============================

  const resetForm = () => {
    setFormData({
      vehicleNumber: "",
      vehicleType: "car",
      flatNumber: "",
      parkingSlot: "",
      status: "occupied",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ===============================
  // ADD / UPDATE PARKING
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      // UPDATE
      if (editingId) {
        await API.put(
          `/parking/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          "Parking record updated successfully!"
        );
      }

      // ADD
      else {
        await API.post(
          "/parking",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          "Parking record added successfully!"
        );
      }

      resetForm();
      fetchParking();

    } catch (error) {
      console.log("Parking Save Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save parking record"
      );
    }
  };

  // ===============================
  // EDIT PARKING
  // ===============================

  const handleEdit = (item) => {
    setFormData({
      vehicleNumber: item.vehicleNumber || "",
      vehicleType: item.vehicleType || "car",
      flatNumber: item.flatNumber || "",
      parkingSlot: item.parkingSlot || "",
      status: item.status || "occupied",
    });

    setEditingId(item._id);
    setShowForm(true);

    setMessage("");
    setError("");
  };

  // ===============================
  // OPEN ADD FORM
  // ===============================

  const openAddForm = () => {
    setFormData({
      vehicleNumber: "",
      vehicleType: "car",
      flatNumber: "",
      parkingSlot: "",
      status: "occupied",
    });

    setEditingId(null);
    setShowForm(true);

    setMessage("");
    setError("");
  };

  return (
    <div className="parking-management">

      {/* ===============================
          PAGE HEADER
      =============================== */}

      <div className="page-header">

        <div>
          <h1>Parking Management</h1>

          <p>
            Manage apartment vehicle and parking slot
            records.
          </p>
        </div>

        <div className="summary-card">

          <span>🚗</span>

          <div>
            <strong>{parking.length}</strong>

            <small>
              Total Parking Records
            </small>
          </div>

        </div>

      </div>

      {/* ===============================
          ADD VEHICLE BUTTON
      =============================== */}

      <div className="parking-add-button-wrapper">

        <button
          type="button"
          onClick={openAddForm}
        >
          + Add Vehicle
        </button>

      </div>

      {/* ===============================
          SUCCESS MESSAGE
      =============================== */}

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* ===============================
          ERROR MESSAGE
      =============================== */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* ===============================
          ADD / EDIT FORM
      =============================== */}

      {showForm && (

        <div className="form-container">

          <div className="parking-form-header">

            <div>
              <h2>
                {editingId
                  ? "Edit Parking Record"
                  : "Add Parking Record"}
              </h2>

              <p>
                Enter vehicle and parking slot details.
              </p>
            </div>

            <button
              type="button"
              className="parking-close-button"
              onClick={resetForm}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            {/* VEHICLE NUMBER */}

            <div>
              <label>
                Vehicle Number
              </label>

              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="TS09AB1234"
                required
              />
            </div>

            {/* VEHICLE TYPE */}

            <div>
              <label>
                Vehicle Type
              </label>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option value="car">
                  Car
                </option>

                <option value="bike">
                  Bike
                </option>

                <option value="scooter">
                  Scooter
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* FLAT NUMBER */}

            <div>
              <label>
                Flat Number
              </label>

              <input
                type="text"
                name="flatNumber"
                value={formData.flatNumber}
                onChange={handleChange}
                placeholder="A-101"
                required
              />
            </div>

            {/* PARKING SLOT */}

            <div>
              <label>
                Parking Slot
              </label>

              <input
                type="text"
                name="parkingSlot"
                value={formData.parkingSlot}
                onChange={handleChange}
                placeholder="P-20"
                required
              />
            </div>

            {/* STATUS */}

            <div>
              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="occupied">
                  Occupied
                </option>

                <option value="available">
                  Available
                </option>
              </select>
            </div>

            {/* FORM BUTTONS */}

            <div className="parking-form-actions">

              <button
                type="submit"
              >
                {editingId
                  ? "Update Vehicle"
                  : "Add Vehicle"}
              </button>

              <button
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ===============================
          LOADING
      =============================== */}

      {loading && (
        <div className="loading-message">
          Loading parking records...
        </div>
      )}

      {/* ===============================
          EMPTY STATE
      =============================== */}

      {!loading &&
        !error &&
        parking.length === 0 && (
          <div className="empty-message">
            No parking records found.
          </div>
        )}

      {/* ===============================
          PARKING TABLE
      =============================== */}

      {!loading &&
        parking.length > 0 && (

          <div className="table-container">

            <table className="management-table">

              <thead>

                <tr>
                  <th>
                    Vehicle Number
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Flat
                  </th>

                  <th>
                    Parking Slot
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {parking.map((item) => (

                  <tr key={item._id}>

                    <td>
                      <strong>
                        {item.vehicleNumber}
                      </strong>
                    </td>

                    <td>
                      {item.vehicleType}
                    </td>

                    <td>
                      {item.flatNumber}
                    </td>

                    <td>
                      {item.parkingSlot}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${item.status}`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>

                      <button
                        type="button"
                        className="parking-edit-button"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </button>

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

export default ParkingManagement;