const Project = require("../../models/progressModel");

const getProjectById = async (projectId) => {
  const projectDoc = await Project.findById(projectId);
  return projectDoc;
}


const getProjectByCourseId = async (courseId) => {
  const projectDoc = await Project.find(courseId);
  return projectDoc;
}

module.exports = { getProjectById, getProjectByCourseId };