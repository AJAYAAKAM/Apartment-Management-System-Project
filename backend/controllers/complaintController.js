const Complaint = require("../models/complaint");

// Add Complaint
const addComplaint = async (req, res) => {
  try {
    const {
      residentName,
      residentEmail,
      flatNumber,
      title,
      description,
      priority,
    } = req.body;

    if (
      !residentName ||
      !residentEmail ||
      !flatNumber ||
      !title ||
      !description
    ) {
      return res.status(400).json({
        message: "Please provide all required complaint details",
      });
    }

    const complaint = await Complaint.create({
      residentName,
      residentEmail,
      flatNumber,
      title,
      description,
      priority: priority || "medium",
    });

    res.status(201).json({
      message: "Complaint added successfully",
      complaint,
    });

  } catch (error) {
    console.log("Add Complaint Error:", error);

    res.status(500).json({
      message: "Failed to add complaint",
    });
  }
};


// Get All Complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Complaints fetched successfully",
      complaints,
    });

  } catch (error) {
    console.log("Get Complaints Error:", error);

    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};


// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Please provide complaint status",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });

  } catch (error) {
    console.log("Update Complaint Error:", error);

    res.status(500).json({
      message: "Failed to update complaint status",
    });
  }
};


module.exports = {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
};