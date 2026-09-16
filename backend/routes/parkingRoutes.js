const express = require("express");

const {
  addParking,
  getParking,
  updateParking,
} = require("../controllers/parkingController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add Parking
router.post(
  "/",
  protect,
  allowRoles("admin", "security"),
  addParking
);

// Get All Parking
router.get(
  "/",
  protect,
  allowRoles("admin", "security", "resident"),
  getParking
);

// Update Parking
router.put(
  "/:id",
  protect,
  allowRoles("admin", "security"),
  updateParking
);

module.exports = router;