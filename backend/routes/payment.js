const express = require('express');
const router = express.Router();

const { processPayment, sendStripeApiKey } = require('../controllers/payment');

const { isUserAuthenticated } = require('../middlewares/auth');

router
  .route('/process')
  .post(isUserAuthenticated, processPayment);

router
  .route('/stripeapikey')
  .get(isUserAuthenticated, sendStripeApiKey);

module.exports = router;