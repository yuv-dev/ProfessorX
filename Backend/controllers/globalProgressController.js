const GlobalProgress = require("../models/globalProgressModel"); // Adjust path

// Helper: Check if two dates are on the same day
const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Helper: Check if d1 is exactly one day after d2
const isConsecutiveDay = (d1, d2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = d1 - d2;
  return diff < oneDay * 2 && diff > 0 && d1.getDate() !== d2.getDate();
};

/**
 * @desc    Get dashboard data for a user
 * @route   GET /api/globalprogress
 */
exports.getDashboardData = async (req, res) => {
  try {
    // Assuming req.user.id comes from auth middleware
    const userId = req.user.id;
    const progress = await GlobalProgress.findOne({ userId })
      .populate("lastActiveModule.courseId", "title") // Populate Course info
      .populate("lastActiveModule.moduleId", "moduleTitle"); // Populate Module info

    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Initialize progress (Call this upon User Registration)
 */
exports.initializeProgress = async (userId) => {
  try {
    const existing = await GlobalProgress.findOne({ userId });
    if (existing) return existing;
    console.log("existing");
    const newProgress = await GlobalProgress.create({
      userId,
      activity: {
        lastActive: new Date(),
        loginCount: 1,
        currentStreak: 1,
        longestStreak: 1,
      },
    });
    console.log("existing", newProgress);

    return newProgress;
  } catch (error) {
    console.error("Error initializing progress:", error);
    throw error;
  }
};

/**
 * @desc    Record a user login
 */
exports.recordLogin = async (userId) => {
  try {
    const progress = await GlobalProgress.findOneAndUpdate(
      { userId },
      { $inc: { "activity.loginCount": 1 } },
      { new: true },
    );

    if (!progress) {
      // This can happen if the user logs in for the first time
      // through a path that doesn't call initializeProgress first.
      return await exports.initializeProgress(userId);
    }
    return progress;
  } catch (error) {
    console.error("Error recording login:", error);
    throw error;
  }
};

/**
 * @desc    Update Activity (Logins, Streaks, Time Spent)
 * @route   POST /api/globalprogress/activity
 */
exports.updateActivityStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionDurationMinutes } = req.body;

    const progress = await GlobalProgress.findOne({ userId });
    if (!progress)
      return res.status(404).json({ message: "User progress not found" });

    // 1. Setup Dates
    const now = new Date();
    const lastActive = new Date(progress.activity.lastActive);

    // Create a separate Date object for midnight today to store in the calendar log
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // 2. --- CALENDAR LOGIC (New) ---
    // Ensure activityLog array exists
    if (!progress.activity.activityLog) {
      progress.activity.activityLog = [];
    }

    // Check if we already logged today in the calendar array
    // We compare timestamps to be accurate
    const alreadyLoggedToday = progress.activity.activityLog.some(
      (date) => new Date(date).getTime() === todayStart.getTime(),
    );

    if (!alreadyLoggedToday) {
      progress.activity.activityLog.push(todayStart);
    }

    // 3. --- STREAK LOGIC ---
    let newStreak = progress.activity.currentStreak;

    // Helper: isSameDay (ensure this helper is imported or defined in file)
    if (isSameDay(now, lastActive)) {
      // User already logged in today, do not increment streak
    } else if (isConsecutiveDay(now, lastActive)) {
      // User logged in yesterday, increment streak
      newStreak += 1;
    } else {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    const newLongest = Math.max(newStreak, progress.activity.longestStreak);

    // 4. --- UPDATE FIELDS ---
    progress.activity.lastActive = now; // Sets to current timestamp (e.g., 10:45 AM)
    progress.activity.currentStreak = newStreak;
    progress.activity.longestStreak = newLongest;

    if (sessionDurationMinutes) {
      progress.activity.totalHoursSpent += sessionDurationMinutes / 60;
    }

    await progress.save();

    // Return the updated activity object (now includes the calendar log)
    res.status(200).json(progress.activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
/**
 * @desc    Update Last Active Module (Resume Learning)
 * @route   PUT /api/globalprogress/module
 */
exports.updateLastActiveModule = async (
  courseId,
  moduleId,
  progressPercentage,
  userId,
) => {
  try {
    const updateData = {
      "lastActiveModule.courseId": courseId,
      "lastActiveModule.moduleId": moduleId,
      "lastActiveModule.progressPercentage": progressPercentage,
      "activity.lastActive": new Date(), // Keeping this fresh
    };

    const progress = await GlobalProgress.findOneAndUpdate(
      { userId },
      {
        $set: updateData,
      },
      { new: true, upsert: true }, // Upsert ensures it creates if missing
    );

    return progress;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Add or Update a Skill
 * @route   PUT /api/globalprogress/skill
 */
exports.updateSkill = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subject, rank } = req.body; // e.g., "JavaScript", "Intermediate"

    const progress = await GlobalProgress.findOne({ userId });

    // Check if skill exists
    const skillIndex = progress.skillSet.findIndex(
      (s) => s.subject === subject,
    );

    if (skillIndex > -1) {
      // Update existing rank
      progress.skillSet[skillIndex].rank = rank;
    } else {
      // Add new skill
      progress.skillSet.push({ subject, rank });
    }

    await progress.save();
    res.status(200).json(progress.skillSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Unlock a Milestone
 * @route   POST /api/globalprogress/milestone
 */
exports.addMilestone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body; // e.g., "7 Day Streak Warrior"

    // Use $addToSet to prevent duplicate milestones with the same title (if desired)
    // Or just push if you allow duplicates. Here we prevent duplicates.
    const progress = await GlobalProgress.findOneAndUpdate(
      { userId, "milestones.title": { $ne: title } },
      {
        $push: {
          milestones: { title, unlockedAt: new Date() },
        },
      },
      { new: true },
    );

    if (!progress) {
      return res
        .status(200)
        .json({ message: "Milestone already unlocked or user not found" });
    }

    res.status(200).json(progress.milestones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
