const router = require('express').Router();

const user = "user";
const password = "123";

router.get('/login', (req, res) => {
  if (req.session.userId) {
    res.render('admin_dashboard');
  } else {
    res.render('admin_login');
  }
});

router.post('/login', (req, res) => {
  if (req.body.username === user && req.body.password === password) {
    let session = req.session;
    session.userId = req.body.username;
    res.json('Logged');
  } else {
    res.json('Invalid credentials');
  }
});

router.get('/dashboard', (req, res) => {

});

module.exports = router;