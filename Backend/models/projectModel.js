const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", index: true },
  miniProjects: [
    {
      projectTitle: String,
      description: String,
      requirements: [String],
      steps: [String],
    },
  ],
  finalProject: {
    projectTitle: String,
    description: String,
    features: [String],
    stretchGoals: [String],
    requirements: [String],
    steps: [String],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);

