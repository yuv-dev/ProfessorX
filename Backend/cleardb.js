const mongoose = require('mongoose');

async function totalReset() {
  // 1. Clear memory
  mongoose.models = {};
  
  // 2. Connect
  await mongoose.connect('mongodb://127.0.0.1:27017/learner_db');
  
  // 3. Clear Database
  await mongoose.connection.db.dropDatabase();
  
  console.log("Memory cleared, Database dropped. You are now 100% fresh.");
  process.exit();
}

totalReset();