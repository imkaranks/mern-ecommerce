const Order = require('../models/order');
const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const APIError = require('../error/api-error');
const catchAsyncError = require('../middlewares/catch-async-error');

const createOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.create({
    ...req.body,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    order
  });
});

const getOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return next(new APIError(`Order not found with id: ${req.params.id}`, StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    order
  })
});

const getMyOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({user: req.user._id});

  res.status(StatusCodes.OK).json({
    success: true,
    orders
  })
});

/* ===[ Get All Order -- Admin ]=== */
const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  res.status(StatusCodes.OK).json({
    success: true,
    totalAmount,
    orders
  });
});

/* ===[ Update Order -- Admin ]=== */
const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new APIError(`Order doesn't exist with id: ${req.params.id}`, StatusCodes.NOT_FOUND));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new APIError('Order has been already delivered', StatusCodes.BAD_REQUEST));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }

  order.orderStatus = req.body.status;
  
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(StatusCodes.OK).json({
    success: true
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

/* ===[ Delete Order -- Admin ]=== */
const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new APIError(`Order doesn't exist with id: ${req.params.id}`, StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    success: true
  });
});

module.exports = {
  createOrder,
  getOrder,
  getMyOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};