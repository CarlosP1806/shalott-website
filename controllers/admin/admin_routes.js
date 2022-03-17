const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('admin_login');
});

module.exports = router;