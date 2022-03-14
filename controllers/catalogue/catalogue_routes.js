const router = require('express').Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('catalogue', { products: products, title: "Todos los productos", categories: false });
});

// GET all categories
router.get('/categorias', async (req, res) => {
  const categories = await Category.find({});
  res.render('catalogue', { products: categories, title: "Categorias", categories: true});
});

// GET products from given category
router.get('/categorias/:categoria', async (req, res) => {
  const products = await Product.find({ productCategory: req.params.categoria });
  res.render('catalogue', { products: products, title: req.params.categoria, categories: false});
});

// GET all collections
router.get('/colecciones', async (req, res) => {
  const collections = await Collection.find({});
  res.render('catalogue', { products: collections, title: "Colecciones", categories: true });
});

// GET products from given collection
router.get('/colecciones/:coleccion', async (req, res) => {
  const products = await Collection.find({ productCollection: req.params.coleccion });
  res.render('catalogue', { products: products, title: req.params.coleccion, categories: false});
});

module.exports = router;