const router = require('express').Router();
const db_products = require('../../db/products.json');
const db_categories = require('../../db/categories.json');

const Product = require('../../models/Product.js');

router.get('/', async (req, res) => {
  // Get featured products to display 
  const featuredProducts = await Product.find({ featured: true });
  res.render('homepage', {
    products: featuredProducts, 
    categories: db_categories
  });
})

router.get('/catalogue', (req, res) => {
  res.render('catalogue', { products: db_products });
});

module.exports = router;