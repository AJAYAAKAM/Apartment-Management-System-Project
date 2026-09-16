const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
    console.log("Database Name:", mongoose.connection.name);

  } catch (error) {
    console.log("FULL ERROR:");
    console.log(error);

    throw error;
  }
};

module.exports = connectDB;