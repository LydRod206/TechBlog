const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Import the User model

// Handle user signup
router.post('/signup', async (req, res) => {
  try {
    // Create a new user in the database
    const newUser = await User.create(req.body);
    // Set the user's id as the session id
    req.session.userId = newUser.id;
    res.status(200).json({ success: true, message: 'User signed up successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user by their username in the database
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      return;
    }
    // Verify the password
    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      return;
    }
    // Set the user's id as the session id
    req.session.userId = user.id;
    res.status(200).json({ success: true, message: 'User logged in successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Handle user logout
router.post('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(200).json({ success: true, message: 'User logged out successfully' });
    }
  });
});

module.exports = router;
