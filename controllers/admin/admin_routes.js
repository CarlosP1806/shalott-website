const router = require('express').Router();

router.get('/', (req, res) => {
  if(req.session.userId) {
    res.render('admin_dashboard');
  } else {
    res.render('admin_login');
  }
});

router.post('/login', (req, res) => {
  if (req.body.username === user && req.body.password === password) {
    let session = req.session;
    session.userId = req.body.username;
    res.status(200).json('Logged');
  } else {
    res.status(500).json('Invalid credentials');
  }
});

module.exports = router;