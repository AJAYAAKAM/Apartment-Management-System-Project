const express = require("express");

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add Complaint - Resident only
router.post(
  "/",
  protect,
  allowRoles("resident"),
  addComplaint
);

// Get Complaints - Admin and Resident
router.get(
  "/",
  protect,
  allowRoles("admin", "resident"),
  getComplaints
);

// Update Complaint Status - Admin only
router.put(
  "/:id/status",
  protect,
  allowRoles("admin"),
  updateComplaintStatus
);

module.exports = router;