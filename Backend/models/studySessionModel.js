const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

// models/StudySession.js
const SessionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String }, // '2026-01-24'
  minutes: { type: Number, default: 0 },
});

const StudySession = mongoose.model("StudySession", SessionSchema);

module.exports = StudySession;
