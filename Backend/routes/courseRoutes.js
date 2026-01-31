const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  generateCourse,
  fetchCourse,
  fetchCourseModule,
  fetchCourseProject,
  fetchCourseQuiz,
  fetchAllCourses,
  fetchProjectByCourseId,
} = require("../controllers/courseController");

router.post("/generate", verifyToken, generateCourse);
router.get("/all", verifyToken, fetchAllCourses);
router.get("/id/:courseId", verifyToken, fetchCourse);
router.get("/modules/id/:moduleId", verifyToken, fetchCourseModule);
router.get("/projects/id/:projectId", verifyToken, fetchCourseProject);
router.get("/projects/:courseId", verifyToken, fetchProjectByCourseId);

module.exports = router;
