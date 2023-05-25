const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models'); 

// Create a new comment for a post
router.post('/posts/:id/comments', async (req, res) => {
  try {
    const postId = req.params.id;
    // Get the comment data from the request body
    const { commentText } = req.body;
    // Create the comment with the provided data
    const newComment = await Comment.create({
      commentText,
      PostId: postId,
    });
    res.status(201).json({ success: true, message: 'Comment created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
