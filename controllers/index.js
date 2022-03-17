const router = require('express').Router();
const homeRoutes = require('./home/home_routes');
const catalogeRoutes = require('./catalogue/catalogue_routes');
const adminRoutes = require('./admin/admin_routes');

router.use('/', homeRoutes);
router.use('/catalogo', catalogeRoutes);
router.use('/admin', adminRoutes);

module.exports = router;