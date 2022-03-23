const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('shopping_cart');
});

router.get('/checkout', (req, res) => {
  res.render('checkout');
});

module.exports = router;