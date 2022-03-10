const router = require('express').Router();
const homeRoutes = require('./home/home_routes');
const catalogeRoutes = require('./catalogue/catalogue_routes');

router.use('/', homeRoutes);
router.use('/catalogo', catalogeRoutes);

module.exports = router;