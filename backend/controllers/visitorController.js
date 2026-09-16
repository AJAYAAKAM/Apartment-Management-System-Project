const Visitor = require("../models/visitor");

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

module.exports = {
  addVisitor,
  getVisitors,
};