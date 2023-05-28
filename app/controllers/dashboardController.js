const { Users, Post } = require('../models');

// Render the user dashboard
const renderDashboard = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await Users.findByPk(userId, { include: Post });
    const posts = user ? user.Posts : [];
    res.render('dashboard', { user, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create a new blog post
const createPost = async (req, res) => {
  try {
    const userId = req.session.userId;
    const newPost = await Post.create({ ...req.body, UsersId: userId });
    res.status(201).json({ success: true, message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a blog post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.destroy({ where: { id: postId } });
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a blog post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.update(req.body, { where: { id: postId } });
    res.status(200).json({ success: true, message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  renderDashboard,
  createPost,
  deletePost,
  updatePost,
};
