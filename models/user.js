
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Fix: Check if model exists before creating
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
