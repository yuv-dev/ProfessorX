const mongoose = require("mongoose");
const { Schema } = mongoose;

// --- 1. Module Schema ---
const ModuleSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", index: true },
  moduleTitle: String,
  summary: String,
  learningOutcomes: [String],
  lessons: [
    {
      lessonTitle: String,
      explanation: String,
      detailedDescription: String,
      analogy: String,
      examples: String,
      practiceTasks: [String],
      miniQuiz: [String],
    },
  ],
  importantPoints: [String],
});

module.exports = mongoose.model("Module", ModuleSchema);
