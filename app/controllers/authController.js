const { Users } = require('../models/User');

// Handle user signup
const signup = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    req.session.userId = newUser.id;
    res.status(200).json({ success: true, message: 'User signed up successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Handle user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      return;
    }
    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      return;
    }
    req.session.userId = user.id;
    res.status(200).json({ success: true, message: 'User logged in successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Handle user logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(200).json({ success: true, message: 'User logged out successfully' });
    }
  });
};

module.exports = {
  signup,
  login,
  logout,
};
