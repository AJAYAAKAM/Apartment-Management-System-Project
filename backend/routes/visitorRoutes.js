const express = require("express");

const {
  addVisitor,
  getVisitors,
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add Visitor
router.post(
  "/",
  protect,
  allowRoles("security"),
  addVisitor
);

// Get All Visitors
router.get(
  "/",
  protect,
  allowRoles("admin", "security", "resident"),
  getVisitors
);

module.exports = router;