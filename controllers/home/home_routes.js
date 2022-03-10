const router = require('express').Router();

const Product = require('../../models/Product.js');
const Category = require('../../models/Category.js');

router.get('/', async (req, res) => {
  const featuredProducts = await Product.find({ featured: true });
  const categories = await Category.find({});
  res.render('homepage', {
    products: featuredProducts, 
    categories: categories
  });
});

module.exports = router;