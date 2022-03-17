const router = require('express').Router();
const Admin = require('../../models/Admin');

router.get('/', (req, res) => {
  if(req.session.userId) {
    res.render('admin_dashboard');
  } else {
    res.render('admin_login');
  }
});

router.post('/login', async (req, res) => {

  const admins = await Admin.find({});
  const admin = admins[0];

  if (req.body.username === admin.username && req.body.password === admin.password) {
    let session = req.session;
    session.userId = req.body.username;
    res.status(200).json('Logged');
  } else {
    res.status(500).json('Invalid credentials');
  }
});

module.exports = router;