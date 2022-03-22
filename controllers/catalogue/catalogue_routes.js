const router = require('express').Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

// GET all products
router.get('/', async (req, res) => {
  const sorted = req.query.sort;
  let products;
  if(!sorted) products = await Product.find({});
  else products = await Product.find({}).sort({ productPrice: sorted });

  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  const page = req.query.page; // TODO: ADD VALIDATION TO PAGES

  res.render('catalogue', { 
    page: page ? page : 1,
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

  const page = req.query.page;

  res.render('catalogue', { 
    page: page ? page : 1,
    products: categories, 
    title: "Categorias", 
    groups: true, 
    collections : false,
    selectCategories,
    selectCollections });
});

// GET products from given category
router.get('/categorias/:categoria', async (req, res) => {
  const sorted = req.query.sort;
  let products;
  if(!sorted) products = await Product.find({ productCategory: req.params.categoria });
  else products = 
    await Product.find({ productCategory: req.params.categoria}).sort({ productPrice: sorted });
  
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  const page = req.query.page;

  res.render('catalogue', { 
    page: page ? page : 1,
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
  const page = req.query.page;

  res.render('catalogue', {
    page: page ? page : 1,
    products: collections, 
    title: "Colecciones", 
    groups: true, 
    collections: true,
    selectCategories,
    selectCollections });
});

// GET products from given collection
router.get('/colecciones/:coleccion', async (req, res) => {
  const sorted = req.query.sort;
  let products;
  if(!sorted) products = await Product.find({ productCollection: req.params.coleccion });
  else products = 
    await Product.find({ productCollection: req.params.coleccion}).sort({ productPrice: sorted });
  
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  const page = req.query.page;  

  res.render('catalogue', { 
    page: page ? page : 1,
    products: products, 
    title: req.params.coleccion, 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
});

// GET given product
router.get('/producto/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  res.render('product', { product: product });
});

module.exports = router;