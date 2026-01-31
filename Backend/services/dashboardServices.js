const Progress = require("../models/progressModel");

async function getRadarStats(userId) {
  const levelMap = {
    beginner: 30,
    intermediate: 60,
    advanced: 90,
    native: 100,
  };

  // We fetch progress and populate course info to get the Language/Subject name
  const progressRecords = await Progress.find({ userId })
    .populate("courseId", "targetLanguage title")
    .lean();

  return progressRecords.map((p) => ({
    // Use Target Language (e.g., Spanish) or Course Title as the axis label
    subject: p.courseId.targetLanguage || p.courseId.title,
    // Map the string level to a number for the chart
    level: levelMap[p.profile.currentLevel] || 10,
    fullMark: 100,
  }));
}

// Backend: lib/stats-logic.js
const StudySession = require("../models/studySessionModel");
const moment = require("moment");

async function getWeeklyActivity(userId) {
  const startOfPeriod = moment().subtract(6, "days").startOf("day").toDate();

  // 1. Aggregate minutes spent per day
  const rawStats = await StudySession.aggregate([
    {
      $match: {
        userId: userId,
        lastHeartbeat: { $gte: startOfPeriod },
      },
    },
    {
      $group: {
        _id: "$date", // Grouping by our YYYY-MM-DD string
        totalMinutes: { $sum: "$minutesSpent" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // 2. Fill in gaps (ensure every day in the last 7 exists in the array)
  const activityMap = new Map(rawStats.map((s) => [s._id, s.totalMinutes]));
  const finalData = [];

  for (let i = 6; i >= 0; i--) {
    const dateStr = moment().subtract(i, "days").format("YYYY-MM-DD");
    const dayName = moment().subtract(i, "days").format("ddd"); // 'Mon', 'Tue'...

    finalData.push({
      day: dayName,
      hours: parseFloat(((activityMap.get(dateStr) || 0) / 60).toFixed(1)),
    });
  }

  return finalData;
}

module.exports = {
  getRadarStats,
  getWeeklyActivity,
};
