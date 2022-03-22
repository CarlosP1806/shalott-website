const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('shopping_cart.ejs');
});

module.exports = router;