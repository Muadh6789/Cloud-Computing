const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  topic: [String], // e.g., ['Tech']
  body: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: Date
  }],
  status: { type: String, enum: ['Live', 'Expired'], default: 'Live' },
  expiration: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
