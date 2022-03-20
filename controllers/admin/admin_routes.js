const router = require('express').Router();
const Admin = require('../../models/Admin');
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

router.get('/', async (req, res) => {
  if (req.session.userId) {
    const categories = await Category.find({});
    const collections = await Collection.find({});
    res.render('admin_dashboard', { categories, collections });
  } else {
    res.render('admin_login');
  }
});

router.post('/login', async (req, res) => {

  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) {
    res.status(500).json('Invalid username');
    return;
  }

  if (req.body.password === admin.password) {
    let session = req.session;
    session.userId = req.body.username;
    res.status(200).json('Logged');
  } else {
    res.status(500).json('Invalid credentials');
  }
});

router.get('/search/:id', async (req, res) => {
  const product = await Product.findOne({ productId: req.params.id });
  if (!product) {
    res.json('Not found');
    return;
  }
  res.json(product);
});

router.post('/create/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/delete/', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.body.id });
    if(!product) {
      res.json("No product found");
      return;
    }
    res.json(product);
  } catch(err) {
    res.json(err);
  }
});

router.put('/update/', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ productId: req.body.id }, req.body )
    if(!product) {
      res.json("No product found");
      return;
    }
    res.json(product);
  } catch(err) {
    res.json(err);
  }
});

router.post('/create/collection/', async (req, res) => {
  try {
    const collection = await Collection.create(req.body);
    res.json(collection);
  } catch(err) {
    res.json(err);
  } 
});

module.exports = router;