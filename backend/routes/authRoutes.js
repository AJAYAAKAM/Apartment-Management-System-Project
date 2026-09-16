const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Protected Profile Route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "You can access this protected route",
    user: req.user
  });
});

// Admin Only Route
router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin! You have admin access.",
    user: req.user
  });
});

module.exports = router;