const router = require('express').Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('catalogue', { products: products, title: "Todos los productos", categories: false });
});

router.get('/categorias', async (req, res) => {
  const categories = await Category.find({});
  res.render('catalogue', { products: categories, title: "Categorias", categories: true});
});

router.get('/aretes', async (req, res) => {
  const products = await Product.find({ productCategory: "Aretes" });
  res.render('catalogue', { products: products, title: "Aretes", categories: false });
});

router.get('/collares', async (req, res) => {
  const products = await Product.find({ productCategory: "Collages" });
  res.render('catalogue', { products: products, title: "Collares", categories: false });
});


module.exports = router;