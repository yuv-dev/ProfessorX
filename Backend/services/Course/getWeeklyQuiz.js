const WeeklyQuiz = require("../../models/weeklyQuizModel");

const getWeeklyQuizById = async (weeklyQuizId) => {
  const weeklyQuizDoc = await WeeklyQuiz.findById(weeklyQuizId);
  return weeklyQuizDoc;
};

const getWeeklyQuizByCourseId = async (courseId) => {
  const weeklyQuizDoc = await WeeklyQuiz.find({ courseId: courseId });
  return weeklyQuizDoc;
};

module.exports = { getWeeklyQuizById, getWeeklyQuizByCourseId };
