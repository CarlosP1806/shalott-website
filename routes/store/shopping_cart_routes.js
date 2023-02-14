const router = require('express').Router();
require('dotenv').config();

const {
  renderShoppingCart,
  createCheckoutSession
} = require('../../controllers/store_controlers');

router.route('/').get(renderShoppingCart);
router.route('/create-checkout-session').post(createCheckoutSession);

module.exports = router;