const Course = require("../../models/courseModel");
const Module = require("../../models/moduleModel");
const Project = require("../../models/projectModel");
const WeeklyQuiz = require("../../models/weeklyQuizModel");

async function saveFullCourseToDB(parsedCourse) {
  try {
    // 1. Create the Course instance first to get an ID
    const course = new Course({
      title: parsedCourse.title,
      description: parsedCourse.description,
      roadmap: parsedCourse.roadmap,
      studyGuide: parsedCourse.studyGuide,
    });
    console.log("Course instance created:", course);

    // 2. Save Modules and collect IDs
    const savedModules = await Promise.all(
      parsedCourse.modules.map(async (mod) => {
        const newMod = await Module.create({ ...mod, courseId: course._id });
        return newMod._id;
      }),
    );
    console.log("Module instance created:", savedModules);

    // 3. Save Project and collect ID
    const projectDoc = await Project.create({
      ...parsedCourse.projects,
      courseId: course._id,
    });
    console.log("Project instance created:", projectDoc);

    // 4. Save Weekly Quizzes and collect IDs
    const savedQuizzes = await Promise.all(
      parsedCourse.weeklyQuizzes.map(async (quiz) => {
        const newQuiz = await WeeklyQuiz.create({
          ...quiz,
          courseId: course._id,
        });
        return newQuiz._id;
      }),
    );
    console.log("Quizzez instance created:", savedQuizzes);

    // 5. Update Course with the IDs and save
    course.modules = savedModules;
    course.projects = projectDoc._id;
    course.weeklyQuizzes = savedQuizzes;

    await course.save();
    console.log("Course completely synchronized and saved!", course);
    return course._id;
  } catch (error) {
    console.error("Error during distribution save:", error);
  }
}

module.exports = saveFullCourseToDB;
