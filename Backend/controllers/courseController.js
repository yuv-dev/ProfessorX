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
    let jsonString = result.content.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.replace(/```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/```\s*/, "").replace(/\s*```$/, "");
    }
    const parsedCourse = JSON.parse(jsonString);

    // 5) Save course to DB
    const savedCourse = await saveFullCourseToDB(parsedCourse);

    // 6) return parsed course to frontend
    return res.status(201).json({ ok: true, courseId: savedCourse._id });
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
const { getCompleteCourseById } = require("../services/Course/getCourse");
async function fetchCourse(req, res) {
  try {
    const { courseId } = req.params;
    const courseDoc = await getCompleteCourseById(courseId);
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
    return res.status(200).json({ project: projectDoc });
  } catch (err) {
    console.error("fetchCourseProject error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
}

/**
 * Return project by Course ID
 * @param {*} req
 * @param {*} res
 * @returns project Object
 */
const { getProjectByCourseId } = require("../services/Course/getProject");
async function fetchProjectByCourseId(req, res) {
  try {
    const { courseId } = req.params;
    const projectDoc = await getProjectByCourseId(courseId);
    return res.status(200).json({ project: projectDoc });
  } catch (err) {
    console.error("fetchProjectByCourseId error:", err);
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

/**
 * Get all courses
 * @param {*} req
 * @param {*} res
 */

const { getAllCourses } = require("../services/Course/getCourse");

const fetchAllCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const courses = await getAllCourses(userId);
    return res.status(200).json(courses);
  } catch (err) {
    console.error("fetchAllCourses error:", err);
    return res
      .status(500)
      .json({ error: "server_error", details: err.message });
  }
};

module.exports = {
  generateCourse,
  fetchCourse,
  fetchCourseModule,
  fetchCourseProject,
  fetchCourseQuiz,
  fetchAllCourses,
  fetchProjectByCourseId,
};
