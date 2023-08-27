const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const APIError = require('../error/api-error');
const catchAsyncError = require('../middlewares/catch-async-error');
const sendToken = require('../utils/jwt-token');
const sendEmail = require('../utils/send-email');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

const registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale"
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });
  sendToken(user, StatusCodes.CREATED, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new APIError("Please enter email and password", StatusCodes.BAD_REQUEST));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new APIError("User doesn't exist", StatusCodes.UNAUTHORIZED));
  }
  const isPasswdMatched = await user.comparePasswd(password);
  if (!isPasswdMatched) {
    return next(new APIError("Invalid email or password", StatusCodes.UNAUTHORIZED))
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
    return next(new APIError("User not found", StatusCodes.NOT_FOUND));
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
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new APIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
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
    return next(new APIError("Reset password token is invalid or has been expired", StatusCodes.BAD_REQUEST));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new APIError("Password doesn't match", StatusCodes.BAD_REQUEST));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();
  sendToken(user, StatusCodes.OK, res);
});

const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(StatusCodes.OK).json({
    success: true,
    user
  });
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const isPasswdMatched = user.comparePasswd(oldPassword);

  if (!isPasswdMatched) {
    return next(new APIError("Old password is incorrect", StatusCodes.BAD_REQUEST));
  }

  if (newPassword !== confirmPassword) {
    return next(new APIError("Password doesn't match", StatusCodes.BAD_REQUEST));
  }

  user.password = newPassword;

  await user.save();

  sendToken(user, StatusCodes.OK, res);
});

const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale"
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    newUserData,
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(StatusCodes.OK).json({
    success: true
  });
});

/* ===[ Get All User -- Admin ]=== */
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    users
  });
});

/* ===[ Get User -- Admin ]=== */
const getUser = catchAsyncError(async (req, res, next) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return next(new APIError(`User doesn't exist with id: ${req.params.id}`, StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user
  });
});

/* ===[ Update User Role -- Admin ]=== */
const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }, { new: true, runValidators: true, useFindAndModify: false });

  if (!user) {
    return next(new APIError("User doesn't exists", StatusCodes.BAD_REQUEST));
  }

  res.status(StatusCodes.OK).json({
    success: true
  });
});

/* ===[ Delete User -- Admin ]=== */
const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new APIError("User doesn't exists", StatusCodes.BAD_REQUEST));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User deleted successfully"
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswd,
  resetPasswd,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser
};