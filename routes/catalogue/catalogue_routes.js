const router = require('express').Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Collection = require('../../models/Collection');

const {
  getProducts,
  getCategories,
  getCategoryProducts,
  getCollections,
  getCollectionProducts,
  getProduct
} = require('../../controllers/catalogue_controllers');

router.route('/').get(getProducts);

router.route('/categorias').get(getCategories);
router.route('/categorias/:categoria').get(getCategoryProducts);

router.route('/colecciones').get(getCollections);
router.route('/colecciones/:coleccion').get(getCollectionProducts);

router.route('/producto/:slug').get(getProduct);

module.exports = router;