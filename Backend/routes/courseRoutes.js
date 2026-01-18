const express = require("express");
const router = express.Router();
const {
  generateCourse,
  fetchCourse,
  fetchCourseModule,
  fetchCourseProject,
  fetchCourseQuiz,
  fetchAllCourses,
} = require("../controllers/courseController");

router.post("/generate", generateCourse);
router.get("/all", fetchAllCourses);
router.get("/id/:courseId", fetchCourse);

module.exports = router;
