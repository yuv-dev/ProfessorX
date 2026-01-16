const { buildMasterPrompt } = require("../AI/Utils/MasterPromptCreator");
const { generateCourseOneShot } = require("../services/Course/courseGenerator");
const saveFullCourseToDB = require("../services/Course/saveFullCourseToDB");

/**
 * Generate a full course based on user profile information
 * @param {*} req
 * @param {*} res
 * @returns Course Object saved in DB
 */
async function generateCourse(req, res) {
  try {
    const { profile } = req.body;
    if (!profile || !profile.targetLanguage || !profile.knownLanguages) {
      return res.status(400).json({
        error: "Profile with known Languages and target Language required",
      });
    }

    // 2) Create a prompt to generate the course
    const prompt = buildMasterPrompt(profile);

    // 3) call LLM (single-shot)
    const result = await generateCourseOneShot(prompt);
    if (!result.success) {
      return res
        .status(502)
        .json({ error: "LLM error", details: result.error });
    }

    // 4) Parse LLM result
    parsedCourse = JSON.parse(result.content);

    // 5) Save course to DB
    const savedCourse = await saveFullCourseToDB(parsedCourse);

    // 6) return parsed course to frontend
    return res
      .status(201)
      .json({ courseId: savedCourse._id, course: savedCourse });
  } catch (err) {
    console.error("generateCourse error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
}

/**
 * Fetch a course by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
const { getCompleteCourse } = require("../services/Course/getCourse");
async function fetchCourse(req, res) {
  try {
    const { courseId } = req.params;
    const courseDoc = await getCompleteCourse(courseId);
    return res.status(200).json({ course: courseDoc });
  } catch (err) {
    console.error("fetchCourse error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
}

/**
 * Fetch individual module by ID
 * @param {*} req
 * @param {*} res
 * @returns module object
 */
const { getModuleById } = require("../services/Course/getModule");
async function fetchCourseModule(req, res) {
  try {
    const { moduleId } = req.params;
    const moduleDoc = await getModuleById(moduleId);
    return res.status(200).json({ module: moduleDoc });
  } catch (err) {
    console.error("fetchCourseModule error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
}

/**
 * return projects by ID
 * @param {*} req
 * @param {*} res
 * @returns Course Project
 */
const { getProjectById } = require("../services/Course/getProject");
async function fetchCourseProject(req, res) {
  try {
    const { projectId } = req.params;
    const projectDoc = await getProjectById(projectId);
    return res.status(200).json({ module: projectDoc });
  } catch (err) {
    console.error("fetchCourseModule error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
}

/**
 * Return quiz by ID
 * @param {*} req
 * @param {*} res
 * @returns quiz Object
 */
const { getWeeklyQuizById } = require("../services/Course/getWeeklyQuiz");
async function fetchCourseQuiz(req, res) {
  try {
    const { quizId } = req.params;
    const quizDoc = await getWeeklyQuizById(quizId);
    return res.status(200).json({ module: quizDoc });
  } catch (err) {
    console.error("fetchCourseModule error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
}

module.exports = {
  generateCourse,
  fetchCourse,
  fetchCourseModule,
  fetchCourseProject,
  fetchCourseQuiz,
};
