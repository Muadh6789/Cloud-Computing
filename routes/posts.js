
const express = require('express');
const router = express.Router();
const Post = require('../Models/post');
const User = require('../Models/user');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { title, topic, body, expiration } = req.body;
    const post = new Post({
      title,
      topic,
      body,
      expiration,
      owner: req.user._id,
      status: 'Live'
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts by topic
router.get('/topic/:topic', auth, async (req, res) => {
  try {
    const posts = await Post.find({ topic: req.params.topic });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Like a post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.owner.equals(req.user._id)) return res.status(400).json({ error: 'Cannot like your own post' });
    if (!post.likes.includes(req.user._id)) post.likes.push(req.user._id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Dislike a post
router.post('/:id/dislike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.owner.equals(req.user._id)) return res.status(400).json({ error: 'Cannot dislike your own post' });
    if (!post.dislikes.includes(req.user._id)) post.dislikes.push(req.user._id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Comment on a post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.comments.push({
      user: req.user._id,
      text: req.body.text
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get most active post per topic
router.get('/topic/:topic/most-active', auth, async (req, res) => {
  try {
    const posts = await Post.find({ topic: req.params.topic, status: 'Live' });
    const mostActive = posts.sort((a, b) => (b.likes.length + b.dislikes.length) - (a.likes.length + a.dislikes.length))[0];
    res.json(mostActive || {});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get expired posts per topic
router.get('/topic/:topic/expired', auth, async (req, res) => {
  try {
    const posts = await Post.find({ topic: req.params.topic, status: 'Expired' });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

