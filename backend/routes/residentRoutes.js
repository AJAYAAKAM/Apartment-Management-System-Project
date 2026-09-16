const express = require("express");

const {
  getResidents,
  addResident
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get All Residents - Admin only
router.get(
  "/",
  protect,
  allowRoles("admin"),
  getResidents
);

// Add Resident - Admin only
router.post(
  "/",
  protect,
  allowRoles("admin"),
  addResident
);

module.exports = router;