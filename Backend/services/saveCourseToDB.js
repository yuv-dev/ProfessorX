const Course = require("../models/courseModel");
const Project = require("../models/ProjectsModel");
const Quiz = require("../models/Quizmodel");
const Module = require("../models/modulesModel");

const saveCourse = async (parsedCourse) => {
  const { modules, projects, weeklyQuizzes } = parsedCourse;

  try {
    const courseDoc = new Course({
      title: parsedCourse.title,
      description: parsedCourse.description,
      roadmap: {
        duration: parsedCourse.roadmap.duration,
        dailyPlan: parsedCourse.roadmap.dailyPlan,
      },
      studyGuides: parsedCourse.studyGuide,
    });

    const savedModules = modules.map(async (mod) => {
      const moduleDoc = new Module({
        courseId: courseDoc._id,
        moduleTitle: mod.moduleTitle,
        summary: mod.summary,
        learningOutcomes: mod.learningOutcomes,
        lessons: mod.lessons,
      });
      const savedModule = await moduleDoc.save();
      return { _id: savedModule._id, title: mod.moduleTitle };
    });

    const savedProjects = projects.map(async (proj) => {
      const projectDoc = new Project({
        courseId: courseDoc._id,
        title: proj.title,
        description: proj.description,
        content: proj.content,
      });
      const savedProject = await projectDoc.save();
      return { _id: savedProject._id, title: proj.title };
    });

    const savedQuizes = weeklyQuizzes.map(async (quiz) => {
      const quizDoc = new Quiz({
        courseId: courseDoc._id,
        week: quiz.week,
        questions: {
          question: quiz.questions.question,
          options: quiz.questions.options,
          correctAnswer: quiz.questions.correctAnswer,
        },
      });
      const savedQuiz = await quizDoc.save();
      return { _id: savedQuiz._id, title: quiz.title };
    });

    courseDoc.modules = await Promise.all(savedModules); //Save modules and wait for all to complete
    courseDoc.projects = await Promise.all(savedProjects);
    courseDoc.quizes = await Promise.all(savedQuizes);

    const savedCourse = await courseDoc.save();
    console.log("Course saved successfully ", savedCourse);
    return savedCourse;
  } catch (error) {
    console.error("Error saving course to DB:", error);
    throw error;
  }
};

module.exports = saveCourse;
