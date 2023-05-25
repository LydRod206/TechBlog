const express = require('express');
const router = express.Router();
const { User, Post } = require('../models'); // Import the User and Post models

// Render the user dashboard
router.get('/', async (req, res) => {
  try {
    // Fetch the user's posts from the database
    const userId = req.session.userId;
    const user = await User.findByPk(userId, { include: Post });
    const posts = user ? user.Posts : [];
    res.render('dashboard', { user, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create a new blog post
router.post('/posts', async (req, res) => {
  try {
    // Get the user's id from the session
    const userId = req.session.userId;
    // Create the post with the provided data
    const newPost = await Post.create({ ...req.body, UserId: userId });
    res.status(201).json({ success: true, message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a blog post
router.delete('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    // Find the post by its id and delete it
    await Post.destroy({ where: { id: postId } });
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a blog post
router.put('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    // Find the post by its id and update it with the provided data
    await Post.update(req.body, { where: { id: postId } });
    res.status(200).json({ success: true, message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
