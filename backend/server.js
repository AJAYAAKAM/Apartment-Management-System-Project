const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("dns").setDefaultResultOrder("ipv4first");

const connectDB = require("./config/db");
const User = require("./models/user");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Apartment Management System Backend is Running!");
});

// Test User route
app.get("/test-user", async (req, res) => {
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
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();