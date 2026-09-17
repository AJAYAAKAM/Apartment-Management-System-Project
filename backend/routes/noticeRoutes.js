const express = require("express");

const {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create Notice
router.post(
  "/",
  protect,
  allowRoles("admin"),
  createNotice
);

// Get All Notices
router.get(
  "/",
  protect,
  allowRoles("admin", "resident", "security"),
  getNotices
);

// Update Notice
router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  updateNotice
);

// Delete Notice
router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deleteNotice
);

module.exports = router;