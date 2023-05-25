const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models'); // Import the necessary models

// Render the home page
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const posts = await Post.findAll({ include: [User, Comment] });
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Render a specific blog post
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    // Fetch the blog post by its id along with its associated user and comments
    const post = await Post.findByPk(postId, { include: [User, Comment] });
    res.render('post', { post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
