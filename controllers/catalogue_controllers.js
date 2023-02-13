const Product = require('../models/Product');
const Category = require('../models/Category');
const Collection = require('../models/Collection');

async function getProducts(req, res) {
  let sorted = req.query.sort; 
  if (sorted && sorted !== "asc" && sorted !== "desc") sorted = null;
  let products;
  if(!sorted) products = await Product.find({});
  else products = await Product.find({}).sort({ productPrice: sorted });

  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});
  
  let page = req.query.page; 
  if (page && !isNaN(page) && page <= 0) page = 1;

  res.render('catalogue', { 
    sort: sorted,
    page: page ? page : 1,
    products: products, 
    title: "Todos los productos", 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
}

async function getCategories(req, res) {
  const categories = await Category.find({});
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});

  let page = req.query.page; 
  if (page && !isNaN(page) && page <= 0) page = 1;

  res.render('catalogue', { 
    page: page ? page : 1,
    products: categories, 
    title: "Categorias", 
    groups: true, 
    collections : false,
    selectCategories,
    selectCollections });
}

async function getCategoryProducts(req, res) {
  let sorted = req.query.sort; 
  if (sorted && (sorted !== "asc" && sorted !== "desc")) sorted = null;
  let products;
  if(!sorted) products = await Product.find({ productCategory: req.params.categoria });
  else products = 
    await Product.find({ productCategory: req.params.categoria}).sort({ productPrice: sorted });
  
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});

  let page = req.query.page; 
  if (page && !isNaN(page) && page <= 0) page = 1;

  res.render('catalogue', { 
    category: req.params.categoria,
    sort: sorted,
    page: page ? page : 1,
    products: products, 
    title: req.params.categoria, 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
}

async function getCollections(req, res) {
  const collections = await Collection.find({});
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});

  let page = req.query.page; 
  if (page && !isNaN(page) && page <= 0) page = 1;

  res.render('catalogue', {
    page: page ? page : 1,
    products: collections, 
    title: "Colecciones", 
    groups: true, 
    collections: true,
    selectCategories,
    selectCollections });
}

async function getCollectionProducts(req, res) {
  let sorted = req.query.sort; 
  if (sorted && (sorted !== "asc" && sorted !== "desc")) sorted = null;
  let products;
  if(!sorted) products = await Product.find({ productCollection: req.params.coleccion });
  else products = 
    await Product.find({ productCollection: req.params.coleccion}).sort({ productPrice: sorted });
  
  const selectCategories = await Category.find({});
  const selectCollections = await Collection.find({});

  let page = req.query.page; 
  if (page && !isNaN(page) && page <= 0) page = 1;

  res.render('catalogue', { 
    collection: req.params.coleccion,
    sort: sorted,
    page: page ? page : 1,
    products: products, 
    title: req.params.coleccion, 
    groups: false, 
    collections: false,
    selectCategories,
    selectCollections });
}

async function getProduct(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if(!product) {
    res.render('404');
    return;
  }
  res.render('product', { product: product });
}

module.exports = {
  getProducts,
  getCategories,
  getCategoryProducts,
  getCollections,
  getCollectionProducts,
  getProduct
}