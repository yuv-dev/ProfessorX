const mongoose = require("mongoose");

const globalProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    activity: {
      lastActive: { type: Date, default: Date.now },
      activityLog: [{ type: Date }],
      loginCount: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      totalHoursSpent: { type: Number, default: 0 },
      totalModulesCompleted: { type: Number, default: 0 },
      totalCoursesCompleted: { type: Number, default: 0 },
    },

    lastActiveModule: {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
      progressPercentage: { type: Number, default: 0 },
    },
    skillSet: [
      {
        subject: String,
        rank: { type: String, default: "Beginner" },
      },
    ],

    milestones: [
      {
        title: String,
        unlockedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("GlobalProgress", globalProgressSchema);
