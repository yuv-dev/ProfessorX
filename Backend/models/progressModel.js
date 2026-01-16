const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  profile: {
    currentLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    knownLanguages: [String],
    targetLanguage: String,
    learningGoal: String,
    preferredStyle: String,
  },
  completedModules: [{ type: mongoose.Schema.Types.ObjectId }], // Array of module IDs or names
  completedQuizes: [{ type: mongoose.Schema.Types.ObjectId }], // Array of Quizes IDs or names
  // completedProjects: [{ type: mongoose.Schema.Types.ObjectId }], // Array of Projects IDs or names
  lastAccessed: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", ProgressSchema);
