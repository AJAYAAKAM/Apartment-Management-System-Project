const User = require("../models/user");

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    // Count total residents
    const totalResidents = await User.countDocuments({
      role: "resident"
    });

    res.status(200).json({
      message: "Dashboard statistics fetched successfully",
      statistics: {
        totalResidents
      }
    });

  } catch (error) {
    console.log("Report Error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics"
    });
  }
};

module.exports = {
  getDashboardStats
};