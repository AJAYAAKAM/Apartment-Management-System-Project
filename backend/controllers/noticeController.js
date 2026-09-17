const Notice = require("../models/notice");

const createNotice = async (req, res) => {
  try {
    const {
      title,
      message,
      category,
      createdBy,
    } = req.body;

    if (!title || !message || !createdBy) {
      return res.status(400).json({
        message: "Please provide all notice details",
      });
    }

    const notice = await Notice.create({
      title,
      message,
      category,
      createdBy,
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    console.log("Create Notice Error:", error);

    res.status(500).json({
      message: "Failed to create notice",
    });
  }
};

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Notices fetched successfully",
      notices,
    });
  } catch (error) {
    console.log("Get Notices Error:", error);

    res.status(500).json({
      message: "Failed to fetch notices",
    });
  }
};

const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      message,
      category,
    } = req.body;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    if (title) {
      notice.title = title;
    }

    if (message) {
      notice.message = message;
    }

    if (category) {
      notice.category = category;
    }

    await notice.save();

    res.status(200).json({
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    console.log("Update Notice Error:", error);

    res.status(500).json({
      message: "Failed to update notice",
    });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await Notice.findByIdAndDelete(id);

    res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.log("Delete Notice Error:", error);

    res.status(500).json({
      message: "Failed to delete notice",
    });
  }
};

module.exports = {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
};