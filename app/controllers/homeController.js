const { Post, Users, Comment } = require('../models');

// Render the home page
const getHomePage = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [Users, Comment] });
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Render a specific blog post
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, { include: [Users, Comment] });
    res.render('post', { post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getHomePage,
  getPostById,
};
