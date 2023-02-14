const router = require('express').Router();
const homeRoutes = require('./home/home_routes');
const catalogeRoutes = require('./catalogue/catalogue_routes');
const adminRoutes = require('./admin/admin_routes');
const cartRoutes = require('./store/shopping_cart_routes');

router.use('/', homeRoutes);
router.use('/catalogo', catalogeRoutes);
router.use('/admin', adminRoutes);
router.use('/carrito/', cartRoutes);

module.exports = router;