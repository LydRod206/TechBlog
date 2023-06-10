const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = require('./utils/helpers.js');
const allRoutes = require('./controllers/index.js');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure session
const sess = {
    secret: 'the x-files',
    cookie: { maxAge: 36000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Middleware
app.use(cors());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use('/', allRoutes);

// Sync Sequelize models and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT);
    });
});
