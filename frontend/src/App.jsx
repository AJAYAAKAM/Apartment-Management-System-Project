import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ResidentDashboard from "./pages/ResidentDashboard";
import ResidentMaintenance from "./pages/ResidentMaintenance";
import ResidentFlat from "./pages/ResidentFlat";

import AdminDashboard from "./pages/AdminDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";

import FlatManagement from "./pages/FlatManagement";
import ResidentManagement from "./pages/ResidentManagement";
import MaintenanceManagement from "./pages/MaintenanceManagement";
import ComplaintManagement from "./pages/ComplaintManagement";
import AddComplaint from "./pages/AddComplaint";
import VisitorManagement from "./pages/VisitorManagement";
import ParkingManagement from "./pages/ParkingManagement";
import NoticeManagement from "./pages/NoticeManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<h1>Apartment Management System</h1>}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ROUTES ================= */}

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

        <Route
          path="/admin/notices"
          element={<NoticeManagement />}
        />

        {/* ================= RESIDENT ROUTES ================= */}

        <Route
          path="/resident"
          element={<ResidentDashboard />}
        />

        <Route
          path="/resident/flat"
          element={<ResidentFlat />}
        />

        <Route
          path="/resident/maintenance"
          element={<ResidentMaintenance />}
        />

        <Route
          path="/resident/complaints/add"
          element={<AddComplaint />}
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
          path="/resident/notices"
          element={<NoticeManagement />}
        />

        {/* ================= SECURITY ROUTES ================= */}

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

        <Route
          path="/security/notices"
          element={<NoticeManagement />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;