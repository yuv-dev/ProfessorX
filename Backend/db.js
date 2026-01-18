const mongoose = require("mongoose");
const DB_URL = process.env.DB_URI;

const connectDB = async () => {
  try {
    // Bind connection to error event( to get the notification of connection errors)
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
    mongoose.connection.on("connected", () => console.log("MongoDb connected"));
    mongoose.connection.on("open", () => console.log("open"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("reconnected", () => console.log("reconnected"));
    mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
    mongoose.connection.on("close", () => console.log("close"));

    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");

    const User = require("./models/userModel");

    // Test the connection by fetching all user and  courses
    const allUser = await User.find();
    // console.log("All users in the database:", allUser);
    const { getAllCourses } = require("./services/Course/getCourse");
    const allcourses = await getAllCourses();
    // console.log("All courses in the database:", allcourses);
    //Voila All Well!
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
