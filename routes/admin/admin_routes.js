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


router.route('/collection')
  .post(createCollection)
  .delete(deleteCollection);

router.route('/category')
  .post(createCategory)
  .delete(deleteCategory);

module.exports = router;