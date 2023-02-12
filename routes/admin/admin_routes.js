const router = require('express').Router();

const {
  renderDashboard,
  login,
  searchById,
  createProduct,
  deleteProduct,
  updateProduct,
  createCategory,
  deleteCategory,
  createCollection,
  deleteCollection
} = require('../../controllers/admin_controllers');

router.route('/').get(renderDashboard);
router.route('/login').post(login);
router.route('/search/:id').get(searchById);

router.route('/product')
  .post(createProduct)
  .delete(deleteProduct)
  .put(updateProduct);

router.route('/create/collection').post(createCollection);
router.route('/delete/collection').delete(deleteCollection);

router.route('/create/category').post(createCategory);
router.route('/delete/category').delete(deleteCategory);

module.exports = router;