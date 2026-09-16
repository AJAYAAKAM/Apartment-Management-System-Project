const Maintenance = require("../models/maintenance");

// Add Maintenance Bill
const addMaintenance = async (req, res) => {
  try {
    const {
      flatNumber,
      residentName,
      residentEmail,
      amount,
      dueDate,
      status,
      description,
    } = req.body;

    if (
      !flatNumber ||
      !residentName ||
      !residentEmail ||
      amount === undefined ||
      !dueDate
    ) {
      return res.status(400).json({
        message: "Please provide all required maintenance details",
      });
    }

    const maintenance = await Maintenance.create({
      flatNumber,
      residentName,
      residentEmail,
      amount,
      dueDate,
      status: status || "pending",
      description: description || "Monthly Maintenance",
    });

    res.status(201).json({
      message: "Maintenance bill added successfully",
      maintenance,
    });

  } catch (error) {
    console.log("Add Maintenance Error:", error);

    res.status(500).json({
      message: "Failed to add maintenance bill",
    });
  }
};

// Get All Maintenance Bills
const getMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Maintenance bills fetched successfully",
      maintenance,
    });

  } catch (error) {
    console.log("Get Maintenance Error:", error);

    res.status(500).json({
      message: "Failed to fetch maintenance bills",
    });
  }
};

module.exports = {
  addMaintenance,
  getMaintenance,
};