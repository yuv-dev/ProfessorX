const mongoose = require("mongoose");
const { Schema } = mongoose;

const WeeklyQuizSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", index: true },
  week: Number,
  quizzes: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});
module.exports= mongoose.model("WeeklyQuiz", WeeklyQuizSchema);