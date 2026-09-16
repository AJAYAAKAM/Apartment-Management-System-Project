const express = require("express");

const {
  addMaintenance,
  getMaintenance,
} = require("../controllers/maintenanceController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add Maintenance Bill - Admin only
router.post(
  "/",
  protect,
  allowRoles("admin"),
  addMaintenance
);

// Get Maintenance Bills - Admin and Resident
router.get(
  "/",
  protect,
  allowRoles("admin", "resident"),
  getMaintenance
);

module.exports = router;