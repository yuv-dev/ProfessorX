const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  title: String,
  description: String,
  roadmap: {
    duration: String,
    dailyPlan: [String],
  },
  studyGuide: String,
  // References for easy population
  modules: [
    { _id: { type: Schema.Types.ObjectId, ref: "Module" }, title: String },
  ],
  projects: { type: Schema.Types.ObjectId, ref: "Project" },
  weeklyQuizzes: [
    { _id: { type: Schema.Types.ObjectId, ref: "WeeklyQuiz" }, week: Number },
  ],
});

// Export Models
module.exports = mongoose.model("Course", CourseSchema);
