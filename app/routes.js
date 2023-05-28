const express = require('express');
const router = express.Router();
const { authController, dashboardController, homeController, postController } = require('./controllers/index');

// Home routes
router.get('/', homeController.getHomePage);
router.get('/posts/:id',homeController.getPostById);

// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Dashboard routes
router.get('/dashboard', dashboardController.renderDashboard);
router.post('/dashboard/posts', dashboardController.createPost);
router.delete('/dashboard/posts/:id', dashboardController.deletePost);
router.put('/dashboard/posts/:id', dashboardController.updatePost);

// Post routes
router.post('/posts/:id/comments', postController);

module.exports = router;
