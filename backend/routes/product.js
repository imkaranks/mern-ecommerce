const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');
const { isUserAuthenticated, authorizeRoles } = require('../middlewares/auth');

router.route('/').get(isUserAuthenticated, getAllProducts);
router.route('/new').post(isUserAuthenticated, authorizeRoles("admin"), createProduct);
router.route('/:id')
  .get(getProduct)
  .patch(isUserAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct);

module.exports = router;