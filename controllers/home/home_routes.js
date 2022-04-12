const router = require('express').Router();

const Product = require('../../models/Product.js');
const Category = require('../../models/Category.js');
const Collection = require('../../models/Collection.js');

router.get('/', async (req, res) => {
  const featuredProducts = await Product.find({ featured: true });
  const categories = await Category.find({});
  const collections = await Collection.find({});

  res.render('homepage', {
    products: featuredProducts, 
    categories: categories,
    collections: collections
  });
});

router.get('/success', (req, res) => {
  res.render('404', { message: "¡Pedido realizado exitosamente!" });
});

router.get('/cancel', (req, res) => {
  res.render('404', { message: "La transacción ha sido cancelada" });
});

module.exports = router;