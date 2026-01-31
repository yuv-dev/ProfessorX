const express = require("express");
const router = express.Router();
const {
  getUserProgress,
  enrollInCourse,
  checkEnrollment,
  updateLastActiveModule,
  getProgressByCourseId,
  markModuleCompleted,
  markCourseAsCompleted,
} = require("../controllers/progressController");
const verifyToken = require("../middleware/verifyToken");

router.get("/user/:userId", verifyToken, getUserProgress);
router.post("/enroll", verifyToken, enrollInCourse);
router.get("/check/:courseId", verifyToken, checkEnrollment);
router.put("/update-last-active-module", verifyToken, updateLastActiveModule);
router.get("/course/:courseId", verifyToken, getProgressByCourseId);
router.put("/mark-module-completed", verifyToken, markModuleCompleted);
router.put("/course/:courseId/complete", verifyToken, markCourseAsCompleted);

module.exports = router;
