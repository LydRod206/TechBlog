const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection'); // Import the sequelize connection
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up session
app.use(
  session({
    secret: 'the-x-files',
    resave: false,
    saveUninitialized: true,
  })
);

// Define routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
