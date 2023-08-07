const jwt = require('jsonwebtoken');
const CustomAPIError = require('../error/custom-error');
const catchAsyncError = require('./catch-async-error');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');

const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new CustomAPIError("Please login to access this resource", StatusCodes.UNAUTHORIZED));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomAPIError("You doesn't have admin rights", StatusCodes.FORBIDDEN));
    }
    next();
  }
}

module.exports = {
  isUserAuthenticated,
  authorizeRoles
};