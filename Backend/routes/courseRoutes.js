const express = require("express");
const router = express.Router();
const {
  generateCourse,
  fetchCourse,
  fetchCourseModule,
  fetchCourseProject,
  fetchCourseQuiz,
  fetchAllCourses,
  fetchProjectByCourseId,
} = require("../controllers/courseController");

router.post("/generate", generateCourse);
router.get("/all", fetchAllCourses);
router.get("/id/:courseId", fetchCourse);
router.get("/modules/id/:moduleId", fetchCourseModule);
router.get("/projects/id/:projectId", fetchCourseProject);
router.get("/projects/:courseId", fetchProjectByCourseId);

module.exports = router;
