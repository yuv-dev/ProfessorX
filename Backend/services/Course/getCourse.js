const Course = require("../../models/courseModel");

//Returns course data without population
async function getCourseById(courseId) {
  const fullData = await Course.findById(courseId);

  return fullData;
}

// Returns course data with populated modules, projects, and quizzes
async function getCompleteCourseById(courseId) {
  const fullData = await Course.findById(courseId)
    .populate("modules")
    .populate("projects")
    .populate("weeklyQuizzes")
    .exec();

  return fullData;
}

const Progress = require("../../models/progressModel");

async function getAllCourses(userId) {
  //Get all the courses already enrolled by user
  const enrolledCourseIds = await Progress.find({ userId }).distinct(
    "courseId",
  );

  //Fetch all the courses excluding the ones already enrolled in
  const availableCourses = await Course.find({
    _id: { $nin: enrolledCourseIds },
  }).select("title description createdAt");
  return availableCourses;
}

async function getAllCoursesByUser(userId) {
  const userCourses = await Progress.find({ userId: userId })
    .populate("courseId", "title description createdAt") // Get course details
    .exec();
  return userCourses;
}
module.exports = {
  getCourseById,
  getCompleteCourseById,
  getAllCourses,
  getAllCoursesByUser,
};
