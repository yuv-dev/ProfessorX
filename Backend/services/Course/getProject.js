const Project = require("../../models/projectModel");

const getProjectById = async (projectId) => {
  const projectDoc = await Project.findById(projectId);
  return projectDoc;
};

const getProjectByCourseId = async (courseId) => {
  const projectDoc = await Project.findOne({ courseId })
    .populate("courseId", "title") // optional: populate course fields
    .lean();
  return projectDoc;
};

module.exports = { getProjectById, getProjectByCourseId };
