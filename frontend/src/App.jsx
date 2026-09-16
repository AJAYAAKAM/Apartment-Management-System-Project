import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ResidentDashboard from "./pages/ResidentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";

import FlatManagement from "./pages/FlatManagement";
import ResidentManagement from "./pages/ResidentManagement";
import MaintenanceManagement from "./pages/MaintenanceManagement";

import ComplaintManagement from "./pages/ComplaintManagement";
import AddComplaint from "./pages/AddComplaint";

import VisitorManagement from "./pages/VisitorManagement";
import ParkingManagement from "./pages/ParkingManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<h1>Apartment Management System</h1>}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<h1>Register Page</h1>}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/flats"
          element={<FlatManagement />}
        />

        <Route
          path="/admin/residents"
          element={<ResidentManagement />}
        />

        <Route
          path="/admin/maintenance"
          element={<MaintenanceManagement />}
        />

        <Route
          path="/admin/complaints"
          element={<ComplaintManagement />}
        />

        <Route
          path="/admin/visitors"
          element={<VisitorManagement />}
        />
        <Route
          path="/admin/parking"
          element={<ParkingManagement />}
        />

        {/* RESIDENT */}
        <Route
          path="/resident"
          element={<ResidentDashboard />}
        />

        <Route
          path="/resident/visitors"
          element={<VisitorManagement />}
        />
        <Route
          path="/resident/parking"
          element={<ParkingManagement />}
        />

        <Route
          path="/resident/complaints/add"
          element={<AddComplaint />}
        />

        {/* SECURITY */}
        <Route
          path="/security"
          element={<SecurityDashboard />}
        />

        <Route
          path="/security/visitors"
          element={<VisitorManagement />}
        />
        <Route
          path="/security/parking"
          element={<ParkingManagement />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;