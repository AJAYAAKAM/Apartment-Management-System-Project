const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    flatNumber: {
      type: String,
      required: true,
      trim: true,
    },

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

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    description: {
      type: String,
      trim: true,
      default: "Monthly Maintenance",
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance = mongoose.model(
  "Maintenance",
  maintenanceSchema
);

module.exports = Maintenance;