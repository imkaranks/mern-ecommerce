const express = require('express');
const { createOrder, getOrder, getMyOrder } = require('../controllers/order');
const router = express.Router();
const { isUserAuthenticated } = require('../middlewares/auth');

router
  .route('/new')
  .post(isUserAuthenticated, createOrder);

router
  .route('/me')
  .get(isUserAuthenticated, getMyOrder);

router
  .route('/:id')
  .get(isUserAuthenticated, getOrder);

module.exports = router;