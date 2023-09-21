const { StatusCodes } = require('http-status-codes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require('../middlewares/catch-async-error');

const processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'INR',
    metadata: {
      company: 'Ecommerce'
    }
  });

  res
    .status(StatusCodes.OK)
    .json({
      success: true,
      client_secret: myPayment.client_secret
    });
});

const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = {
  processPayment,
  sendStripeApiKey
};