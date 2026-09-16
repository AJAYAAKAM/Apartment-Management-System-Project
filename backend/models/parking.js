const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    vehicleType: {
      type: String,
      enum: ["car", "bike", "scooter", "other"],
      required: true,
    },

    flatNumber: {
      type: String,
      required: true,
      trim: true,
    },

    parkingSlot: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["occupied", "available"],
      default: "occupied",
    },
  },
  {
    timestamps: true,
  }
);

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;