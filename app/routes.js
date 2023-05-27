const express = require('express');
const router = express.Router();
const { authController, dashboardController, homeController, postController } = require('./controllers');

// Home routes
router.get('/', homeController);

// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Dashboard routes
router.get('/dashboard', dashboardController);

// Post routes
router.get('/posts/:id', postController.getPostById);
router.post('/posts/:id/comments', postController.createComment);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
