const router = require('express').Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  res.render('catalogue', { 
    products: products, 
    title: "Todos los productos", 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
});

// GET all categories
router.get('/categorias', async (req, res) => {
  const categories = await Category.find({});
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  res.render('catalogue', { 
    products: categories, 
    title: "Categorias", 
    groups: true, 
    collections : false,
    selectCategories,
    selectCollections });
});

// GET products from given category
router.get('/categorias/:categoria', async (req, res) => {
  const products = await Product.find({ productCategory: req.params.categoria });
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  res.render('catalogue', { 
    products: products, 
    title: req.params.categoria, 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
});

// GET all collections
router.get('/colecciones', async (req, res) => {
  const collections = await Collection.find({});
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  res.render('catalogue', { 
    products: collections, 
    title: "Colecciones", 
    groups: true, 
    collections: true,
    selectCategories,
    selectCollections });
});

// GET products from given collection
router.get('/colecciones/:coleccion', async (req, res) => {
  const products = await Product.find({ productCollection: req.params.coleccion });
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  res.render('catalogue', { 
    products: products, 
    title: req.params.coleccion, 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
});

module.exports = router;