const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews
} = require('../controllers/product');
const { isUserAuthenticated } = require('../middlewares/auth');

router
  .route('/')
  .get(getAllProducts);

router
  .route('/review')
  .get(getProductReviews)
  .delete(isUserAuthenticated, deleteProductReviews)
  .patch(isUserAuthenticated, createProductReview);

router
  .route('/:id')
  .get(getProduct);

module.exports = router;