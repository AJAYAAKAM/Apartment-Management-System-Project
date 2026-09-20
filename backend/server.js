const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ override: true });

require("dns").setDefaultResultOrder("ipv4first");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const flatRoutes = require("./routes/flatRoutes");
const residentRoutes = require("./routes/residentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const reportsRoutes = require("./routes/ReportRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/reports", reportsRoutes);

// Health Route
app.get("/health", (req, res) => {
  const dbState =
    mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected";

  res.json({
    status: "ok",
    database: dbState,
    message: "Apartment Management System Backend is running.",
  });
});

// Home Route
app.get("/", (req, res) => {
  res.send("Apartment Management System Backend is Running!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server failed to start:", error.message);
  }
};

startServer();