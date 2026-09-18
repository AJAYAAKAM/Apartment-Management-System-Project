const express = require("express");

const {
  addVisitor,
  getVisitors,
  markVisitorExit,
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// =========================================================
// ADD VISITOR
// =========================================================

router.post(
  "/",
  protect,
  allowRoles("security"),
  addVisitor
);


// =========================================================
// GET ALL VISITORS
// =========================================================

router.get(
  "/",
  protect,
  allowRoles("admin", "security", "resident"),
  getVisitors
);


// =========================================================
// MARK VISITOR EXIT
// =========================================================

router.put(
  "/:id/exit",
  protect,
  allowRoles("security"),
  markVisitorExit
);


module.exports = router;