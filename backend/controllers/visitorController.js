const Visitor = require("../models/visitor");


// =========================================================
// ADD VISITOR
// =========================================================

const addVisitor = async (req, res) => {
  try {
    const {
      visitorName,
      phone,
      flatNumber,
      purpose,
    } = req.body;

    if (
      !visitorName ||
      !phone ||
      !flatNumber ||
      !purpose
    ) {
      return res.status(400).json({
        message: "Please provide all visitor details",
      });
    }

    const visitor = await Visitor.create({
      visitorName,
      phone,
      flatNumber,
      purpose,
    });

    res.status(201).json({
      message: "Visitor added successfully",
      visitor,
    });

  } catch (error) {
    console.log("Add Visitor Error:", error);

    res.status(500).json({
      message: "Failed to add visitor",
    });
  }
};


// =========================================================
// GET ALL VISITORS
// =========================================================

const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Visitors fetched successfully",
      visitors,
    });

  } catch (error) {
    console.log("Get Visitors Error:", error);

    res.status(500).json({
      message: "Failed to fetch visitors",
    });
  }
};


// =========================================================
// MARK VISITOR EXIT
// =========================================================

const markVisitorExit = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findById(id);

    // Check visitor exists
    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    // Check visitor already exited
    if (visitor.status === "exited") {
      return res.status(400).json({
        message: "Visitor has already exited",
      });
    }

    // Update exit details
    visitor.exitTime = new Date();
    visitor.status = "exited";

    await visitor.save();

    res.status(200).json({
      message: "Visitor exit marked successfully",
      visitor,
    });

  } catch (error) {
    console.log("Mark Visitor Exit Error:", error);

    res.status(500).json({
      message: "Failed to mark visitor exit",
    });
  }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {
  addVisitor,
  getVisitors,
  markVisitorExit,
};