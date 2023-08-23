const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const APIError = require('../error/api-error');
const catchAsyncError = require('../middlewares/catch-async-error');
const APIFeatures = require('../api/features');

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultsPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query.clone();
  let filteredProductCount = products.length;
  apiFeature.pagination(resultsPerPage);

  products = await apiFeature.query;

  res.status(StatusCodes.OK).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    filteredProductCount
  });
});

const getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new APIError("Product not found", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    success: true,
    product
  });
});

/* ===[ Create Product -- Admin ]=== */
const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product created successfully",
    product
  });
});

/* ===[ Update Product -- Admin ]=== */
const updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
  if (!product) {
    return next(new APIError("Product not found", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product updated successfully",
    product
  });
});

/* ===[ Delete Product -- Admin ]=== */
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new APIError("Product not found", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted successfully",
    product
  });
});

const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    productId
  }

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review => review.user.toString() === req.user._id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({
    success: true
  });
});

const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new APIError(`Product doesn't exist with id: ${req.query.id}`, StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    reviews: product.reviews
  });
});

const deleteProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new APIError(`Product doesn't exist with id: ${req.query.id}`, StatusCodes.NOT_FOUND));
  }

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
  const numOfReviews = reviews.length;
  const ratingsSum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const rating = ratingsSum !== 0 && numOfReviews !== 0 ? ratingsSum/numOfReviews : 0;

  await Product.findByIdAndUpdate(req.query.productId, {
    numOfReviews,
    rating,
    reviews
  }, { new: true, runValidators: true, useFindAndModify: false });

  res.status(StatusCodes.OK).json({
    success: true,
    reviews: product.reviews
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews
};