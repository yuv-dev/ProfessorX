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

async function getAllCourses() {
  const allcourses = await Course.find().select("title description createdAt");
  return allcourses;
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
