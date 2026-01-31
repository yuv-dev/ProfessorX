const {
  getRadarStats,
  getWeeklyActivity,
} = require("../services/dashboardServices");
const Progress = require("../models/progressModel");
const StudySession = require("../models/studySessionModel");
const moment = require("moment");

const getDashboardSummary = async (req, res) => {
  const userId = req.user.id;

  // 1. Get Skill Progress
  const progress = await Progress.find({ userId }).populate("courseId");
  const radarData = progress.map((p) => ({
    subject: p.profile.targetLanguage,
    level: p.profile.currentLevel, // Assuming a numeric 1-100 value
  }));

  // 2. Get Last 7 days of activity
  const sessions = await StudySession.find({
    userId,
    date: { $gte: moment().subtract(7, "days").format("YYYY-MM-DD") },
  }).sort("date");

  res.json({
    radarData,
    weeklyActivity: sessions.map((s) => ({
      day: s.date,
      hours: s.minutes / 60,
    })),
    stats: { streak: req.user.streak, totalActive: progress.length },
    lastActive: await Progress.findOne({ userId })
      .sort({ updatedAt: -1 })
      .populate("lastActiveModule"),
  });
};

/***
 *
 */
const getGlobalSummary = async (req, res) => {
  const userId = req.user.id;

  // Find the single most recently touched progress record
  const lastActive = await Progress.findOne({ userId })
    .sort({ updatedAt: -1 }) // The timestamp we added earlier
    .populate({
      path: "lastActiveModule", // Path to the Module
      populate: {
        path: "courseId", // Path from Module back to Course
        select: "title modules targetLanguage",
      },
    });

  // Fetch Radar data and Weekly activity in parallel for speed
  const [radarData, weeklySessions] = await Promise.all([
    getRadarStats(userId),
    getWeeklyActivity(userId),
  ]);

  res.json({
    lastActive,
    radarData,
    weeklyActivity: weeklySessions,
    stats: {
      streak: req.user.streak,
      totalActive: await Progress.countDocuments({ userId }),
    },
  });
};

const trackHeartbeat = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id; // From your auth middleware
    const today = moment().format("YYYY-MM-DD");

    // Find the session for today or create it
    // $inc: { minutesSpent: 1 } adds one minute every time the API is hit
    const session = await StudySession.findOneAndUpdate(
      { userId, courseId, date: today },
      {
        $inc: { minutesSpent: 1 },
        $set: { lastHeartbeat: new Date() },
      },
      { upsert: true, new: true },
    );

    res.status(200).json({ success: true, minutesToday: session.minutesSpent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getDashboardSummary, getGlobalSummary, trackHeartbeat };
