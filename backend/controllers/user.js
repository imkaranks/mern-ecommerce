const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../error/custom-error');
const catchAsyncError = require('../middlewares/catch-async-error');
const sendToken = require('../utils/jwt-token');
const sendEmail = require('../utils/send-email');
const crypto = require('crypto');

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

const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged Out"
  });
});

const forgotPasswd = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new CustomAPIError("User not found", StatusCodes.NOT_FOUND));
  }

  const resetToken = user.getResetPasswdToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswdUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is:-\n\n${resetPasswdUrl}\n\nIf you have not requested this email then please ignore it.\n\nRegards`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      body: message
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Email sent to ${user.email} successfully`
    })
  } catch(error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new CustomAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
  }
});

const resetPasswd = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return next(new CustomAPIError("Reset password token is invalid or has been expired", StatusCodes.BAD_REQUEST));
  }
  
  if (req.body.password !== req.body.confirmPassword) {
    return next(new CustomAPIError("Password doesn't match", StatusCodes.BAD_REQUEST));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();
  sendToken(user, StatusCodes.OK, res);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswd,
  resetPasswd
};