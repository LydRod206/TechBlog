const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
router.use('/', homeRoutes);
router.use('/', dashboardRoutes);
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;