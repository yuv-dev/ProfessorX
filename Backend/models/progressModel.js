const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "dropped"],
    default: "active",
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
  lastActiveModule: {type: mongoose.Schema.Types.ObjectId},
  completedModules: [{ type: mongoose.Schema.Types.ObjectId }], // Array of module IDs or names
  completedQuizzes: [{ type: mongoose.Schema.Types.ObjectId }], // Array of Quizes IDs or names
  // completedProjects: [{ type: mongoose.Schema.Types.ObjectId }], // Array of Projects IDs or names
  enrolledAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
});

ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", ProgressSchema);
