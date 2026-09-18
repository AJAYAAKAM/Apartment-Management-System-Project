const express = require("express");
const Maintenance = require("../models/maintenance");
const Complaint = require("../models/complaint");
const Visitor = require("../models/visitor");
const Parking = require("../models/parking");
const Notice = require("../models/notice");

const router = express.Router();

// Dashboard Statistics
router.get("/dashboard-stats", async (req, res) => {
  try {
    res.json({
      message: "Dashboard stats working"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Maintenance Report
router.get("/maintenance", async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find();

    res.json({
      count: maintenanceRecords.length,
      records: maintenanceRecords
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch maintenance report",
      error: error.message
    });
  }
});

// Complaint Report
router.get("/complaints", async (req, res) => {
  try {
    const complaintRecords = await Complaint.find();

    res.json({
      count: complaintRecords.length,
      records: complaintRecords
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaint report",
      error: error.message
    });
  }
});

// Visitor Report
router.get("/visitors", async (req, res) => {
  try {
    const visitorRecords = await Visitor.find();

    res.json({
      count: visitorRecords.length,
      records: visitorRecords
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitor report",
      error: error.message
    });
  }
});

// Parking Report
router.get("/parking", async (req, res) => {
  try {
    const parkingRecords = await Parking.find();

    res.json({
      count: parkingRecords.length,
      records: parkingRecords
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch parking report",
      error: error.message
    });
  }
});

// Notice Report
router.get("/notices", async (req, res) => {
  try {
    const noticeRecords = await Notice.find();

    res.json({
      count: noticeRecords.length,
      records: noticeRecords
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notice report",
      error: error.message
    });
  }
});

module.exports = router;