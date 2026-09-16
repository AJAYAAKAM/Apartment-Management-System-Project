import { useEffect, useState } from "react";
import API from "../services/api";

function ParkingManagement() {
  const [parking, setParking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>Parking Management</h1>

          <p>
            Manage apartment vehicle and parking slot records.
          </p>
        </div>

        <div className="summary-card">
          <span>🚗</span>

          <div>
            <strong>{parking.length}</strong>
            <small>Total Parking Records</small>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          Loading parking records...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && parking.length === 0 && (
        <div className="empty-message">
          No parking records found.
        </div>
      )}

      {!loading && !error && parking.length > 0 && (
        <div className="table-container">

          <table className="management-table">

            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Type</th>
                <th>Flat</th>
                <th>Parking Slot</th>
                <th>Status</th>
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