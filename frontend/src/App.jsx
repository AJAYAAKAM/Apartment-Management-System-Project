import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ResidentDashboard from "./pages/ResidentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
import FlatManagement from "./pages/FlatManagement";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<h1>Apartment Management System</h1>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<h1>Register Page</h1>}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/flats"
          element={<FlatManagement />}
        />

        <Route
          path="/resident"
          element={<ResidentDashboard />}
        />

        <Route
          path="/security"
          element={<SecurityDashboard />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;