const Parking = require("../models/parking");

const addParking = async (req, res) => {
  try {
    const {
      vehicleNumber,
      vehicleType,
      flatNumber,
      parkingSlot,
    } = req.body;

    if (
      !vehicleNumber ||
      !vehicleType ||
      !flatNumber ||
      !parkingSlot
    ) {
      return res.status(400).json({
        message: "Please provide all parking details",
      });
    }

    const parking = await Parking.create({
      vehicleNumber,
      vehicleType,
      flatNumber,
      parkingSlot,
    });

    res.status(201).json({
      message: "Parking added successfully",
      parking,
    });
  } catch (error) {
    console.log("Add Parking Error:", error);

    res.status(500).json({
      message: "Failed to add parking",
    });
  }
};
const getParking = async (req, res) => {
  try {
    const parking = await Parking.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Parking records fetched successfully",
      parking,
    });
  } catch (error) {
    console.log("Get Parking Error:", error);

    res.status(500).json({
      message: "Failed to fetch parking records",
    });
  }
};

const updateParking = async (req, res) => {
  try {
    const { id } = req.params;
    const { parkingSlot, status } = req.body;

    const parking = await Parking.findById(id);

    if (!parking) {
      return res.status(404).json({
        message: "Parking record not found",
      });
    }

    if (parkingSlot) {
      parking.parkingSlot = parkingSlot;
    }

    if (status) {
      parking.status = status;
    }

    await parking.save();

    res.status(200).json({
      message: "Parking updated successfully",
      parking,
    });
  } catch (error) {
    console.log("Update Parking Error:", error);

    res.status(500).json({
      message: "Failed to update parking",
    });
  }
};

module.exports = {
  addParking,
  getParking,
  updateParking,
};