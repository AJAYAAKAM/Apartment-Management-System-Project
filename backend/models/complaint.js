const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    residentName: {
      type: String,
      required: true,
      trim: true,
    },

    residentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    flatNumber: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

module.exports = Complaint;