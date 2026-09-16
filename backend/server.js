const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ override: true });

require("dns").setDefaultResultOrder("ipv4first");

const connectDB = require("./config/db");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");
const flatRoutes = require("./routes/flatRoutes");
const residentRoutes = require("./routes/residentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/parking", parkingRoutes);
// Health route for quick startup verification
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.json({
    status: "ok",
    database: dbState,
    message: "Apartment Management System Backend is running.",
  });
});

// Home route
app.get("/", (req, res) => {
  res.send("Apartment Management System Backend is Running!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users"
    });
  }
});

// Temporary test user route
app.get("/test-user", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database is not connected. Start MongoDB or whitelist your IP in Atlas.",
    });
  }

  try {
    const user = await User.create({
      name: "Ajay",
      email: "ajay@gmail.com",
      password: "123456",
      role: "resident",
    });

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User creation failed",
      error: error.message,
    });
  }
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