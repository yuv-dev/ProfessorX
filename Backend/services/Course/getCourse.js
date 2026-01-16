const Course = require("../../models/courseModel");

//Returns course data without population
async function getCourse(courseId) {
  const fullData = await Course.findById(courseId);

  return fullData;
}

// Returns course data with populated modules, projects, and quizzes
async function getCompleteCourse(courseId) {
  const fullData = await Course.findById(courseId)
    .populate("modules")
    .populate("projects")
    .populate("weeklyQuizzes")
    .exec();

  return fullData;
}

module.exports = { getCourse, getCompleteCourse };
