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

module.exports = { getUserProgress };
