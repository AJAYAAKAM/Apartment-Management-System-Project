function ResidentFlat() {
  return (
    <div className="management-page">

      <div className="page-header">
        <div>
          <h1>My Flat</h1>
          <p>View your apartment flat information.</p>
        </div>
      </div>

      <div className="flat-details">

        <div className="flat-card">
          <span>🏠</span>
          <h3>Flat Number</h3>
          <p>A-101</p>
        </div>

        <div className="flat-card">
          <span>🏢</span>
          <h3>Block</h3>
          <p>A Block</p>
        </div>

        <div className="flat-card">
          <span>📐</span>
          <h3>Flat Type</h3>
          <p>2 BHK</p>
        </div>

        <div className="flat-card">
          <span>👤</span>
          <h3>Resident</h3>
          <p>Resident</p>
        </div>

      </div>

    </div>
  );
}

export default ResidentFlat;