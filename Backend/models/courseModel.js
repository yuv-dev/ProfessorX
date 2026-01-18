const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    title: String,
    description: String,
    roadmap: {
      duration: String,
      dailyPlan: [String],
    },
    studyGuide: String,
    // References for easy population
    modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
    projects: { type: Schema.Types.ObjectId, ref: "Project" },
    weeklyQuizzes: [{ type: Schema.Types.ObjectId, ref: "WeeklyQuiz" }],
  },
  { timestamps: true },
);

// Export Models
module.exports = mongoose.model("Course", CourseSchema);
