const Flat = require("../models/flat");

// Add Flat
const addFlat = async (req, res) => {
  try {
    const {
      flatNumber,
      block,
      floor,
      ownerName,
      ownerEmail,
      status,
    } = req.body;

    if (!flatNumber || !block || floor === undefined || !ownerName || !ownerEmail) {
      return res.status(400).json({
        message: "Please provide all required flat details",
      });
    }

    const existingFlat = await Flat.findOne({ flatNumber });

    if (existingFlat) {
      return res.status(400).json({
        message: "Flat already exists",
      });
    }

    const flat = await Flat.create({
      flatNumber,
      block,
      floor,
      ownerName,
      ownerEmail,
      status: status || "occupied",
    });

    res.status(201).json({
      message: "Flat added successfully",
      flat,
    });

  } catch (error) {
    console.log("Add Flat Error:", error);

    res.status(500).json({
      message: "Failed to add flat",
    });
  }
};


// Get All Flats
const getFlats = async (req, res) => {
  try {
    const flats = await Flat.find().sort({ flatNumber: 1 });

    res.status(200).json({
      message: "Flats fetched successfully",
      flats,
    });

  } catch (error) {
    console.log("Get Flats Error:", error);

    res.status(500).json({
      message: "Failed to fetch flats",
    });
  }
};


// Get Single Flat
const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({
        message: "Flat not found",
      });
    }

    res.status(200).json({
      flat,
    });

  } catch (error) {
    console.log("Get Flat Error:", error);

    res.status(500).json({
      message: "Failed to fetch flat",
    });
  }
};


// Update Flat
const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!flat) {
      return res.status(404).json({
        message: "Flat not found",
      });
    }

    res.status(200).json({
      message: "Flat updated successfully",
      flat,
    });

  } catch (error) {
    console.log("Update Flat Error:", error);

    res.status(500).json({
      message: "Failed to update flat",
    });
  }
};


// Delete Flat
const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findByIdAndDelete(req.params.id);

    if (!flat) {
      return res.status(404).json({
        message: "Flat not found",
      });
    }

    res.status(200).json({
      message: "Flat deleted successfully",
    });

  } catch (error) {
    console.log("Delete Flat Error:", error);

    res.status(500).json({
      message: "Failed to delete flat",
    });
  }
};


module.exports = {
  addFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
};