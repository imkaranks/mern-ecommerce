const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../error/custom-error');
const catchAsyncError = require('../middlewares/catch-async-error');
const APIFeatures = require('../api/features');

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultsPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeature.query;
  res.status(StatusCodes.OK).json({
    success: true,
    products,
    productCount
  });
});

const getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomAPIError("Product not found", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    success: true,
    product
  });
});

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product created successfully",
    product
  });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
  if (!product) {
    return next(new CustomAPIError("Product not found", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product updated successfully",
    product
  });
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new CustomAPIError("Product not found", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted successfully",
    product
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};