const express = require("express");
const router = express.Router();
const {
  getUserProgress,
  enrollInCourse,
  checkEnrollment,
} = require("../controllers/progressController");
const verifyToken = require("../middleware/verifyToken");

router.get("/user/:userId", verifyToken, getUserProgress);
router.post("/enroll", verifyToken, enrollInCourse);
router.get("/check/:courseId", verifyToken, checkEnrollment);

module.exports = router;
