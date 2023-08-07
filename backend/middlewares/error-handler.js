const CustomAPIError = require('../error/custom-error');
const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";

  /* ===[ Mongodb Id Error ]=== */
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }

  /* ===[ Mongoose Duplicate Key ]=== */
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }
  
  /* ===[ Wrong JWT Error ]=== */
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid, Try again";
    err = new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }
  
  /* ===[ JWT Expiry Error ]=== */
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired, Try again";
    err = new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
}