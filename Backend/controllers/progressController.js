const Progress = require("../models/progressModel");

const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure the authenticated user matches the requested userId
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const progress = await Progress.find({ userId }).populate("courseId");
    res.json({ progress });
  } catch (err) {
    console.error("Error fetching user progress:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
  console.log("enroll in Course called", courseId, userId);
    // Check if already enrolled
    const existingProgress = await Progress.findOne({ userId, courseId });
    if (existingProgress) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Create new progress record
    const progress = new Progress({
      userId,
      courseId,
      status: "active",
    });

    await progress.save();
    await progress.populate("courseId");

    res.status(201).json({ progress });
  } catch (err) {
    console.error("Error enrolling in course:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    console.log("checkEnrollment called", courseId, userId);

    const progress = await Progress.findOne({ userId, courseId });
    const isEnrolled = !!progress;

    res.json({ isEnrolled, progress });
  } catch (err) {
    console.error("Error checking enrollment:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getUserProgress, enrollInCourse, checkEnrollment };
