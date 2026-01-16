const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  picture: String,
  Skills: [String],
  active_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  completed_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
