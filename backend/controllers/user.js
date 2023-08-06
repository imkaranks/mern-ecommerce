const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../error/custom-error');
const catchAsyncError = require('../middlewares/catch-async-error');
const sendToken = require('../utils/jwt-token');

const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "supersecretpublickey",
      url: "profilepicurl"
    }
  });
  sendToken(user, StatusCodes.CREATED, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomAPIError("Please enter email and password", StatusCodes.BAD_REQUEST));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomAPIError("User doesn't exist", StatusCodes.UNAUTHORIZED));
  }
  const isPasswdMatched = await user.comparePasswd(password);
  if (!isPasswdMatched) {
    return next(new CustomAPIError("Invalid email or password", StatusCodes.UNAUTHORIZED))
  }
  sendToken(user, StatusCodes.OK, res);
});

module.exports = {
  registerUser,
  loginUser
};