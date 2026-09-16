const express = require("express");

const {
  addFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
} = require("../controllers/flatController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add Flat - Admin only
router.post(
  "/",
  protect,
  allowRoles("admin"),
  addFlat
);

// Get All Flats - Admin and Resident
router.get(
  "/",
  protect,
  allowRoles("admin", "resident"),
  getFlats
);

// Get Single Flat - Admin and Resident
router.get(
  "/:id",
  protect,
  allowRoles("admin", "resident"),
  getFlatById
);

// Update Flat - Admin only
router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  updateFlat
);

// Delete Flat - Admin only
router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deleteFlat
);

module.exports = router;