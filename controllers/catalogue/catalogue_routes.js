const router = require('express').Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('catalogue', { products: products, title: "Todos los productos", categories: false });
});

// GET categories
router.get('/categorias', async (req, res) => {
  const categories = await Category.find({});
  res.render('catalogue', { products: categories, title: "Categorias", categories: true});
});

router.get('/categorias/:categoria', async (req, res) => {
  const products = await Product.find({ productCategory: req.params.categoria });
  res.render('catalogue', { products: products, title: req.params.categoria, categories: false});
});

module.exports = router;