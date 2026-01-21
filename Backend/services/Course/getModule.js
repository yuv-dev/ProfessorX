const Module = require("../../models/moduleModel");

const getModuleById = async (moduleId) => {
  const moduleDoc = await Module.findById(moduleId)
    .populate("courseId", "title")
    .exec();
  return moduleDoc;
};

const getModuleByCourseId = async (courseId) => {
  const moduleDoc = await Module.find({ courseId: courseId });
  return moduleDoc;
};

module.exports = { getModuleById, getModuleByCourseId };
