const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    flatNumber: {
      type: String,
      required: true,
      trim: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    entryTime: {
      type: Date,
      default: Date.now,
    },

    exitTime: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["inside", "exited"],
      default: "inside",
    },
  },
  {
    timestamps: true,
  }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;