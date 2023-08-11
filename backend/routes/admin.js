const express = require('express');
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');
const {
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser
} = require('../controllers/user');
const {
  getAllOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/order');

const {
  isUserAuthenticated,
  authorizeRoles
} = require('../middlewares/auth');

/* ===[ Product ]=== */
router
  .route('/product/new')
  .post(isUserAuthenticated, authorizeRoles("admin"), createProduct);

router
  .route('/product/:id')
  .patch(isUserAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct);

/* ===[ User ]=== */
router
  .route('/user')
  .get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route('/user/:id')
  .get(isUserAuthenticated, authorizeRoles("admin"), getUser)
  .patch(isUserAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isUserAuthenticated, authorizeRoles("admin"), deleteUser);

/* ===[ Order ]=== */
router
  .route('/order')
  .get(isUserAuthenticated, authorizeRoles('admin'), getAllOrders);

router
  .route('/order/:id')
  .patch(isUserAuthenticated, authorizeRoles('admin'), updateOrder)
  .delete(isUserAuthenticated, authorizeRoles('admin'), deleteOrder);

module.exports = router;