const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers.js');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'the x-files',
    cookie: { maxAge: 36000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(cors());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join( 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const allRoutes = require('./controllers/api/index.js');
app.use('/', allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});
