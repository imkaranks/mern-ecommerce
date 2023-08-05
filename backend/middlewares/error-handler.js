const CustomAPIError = require('../error/custom-error');
const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";

  /* ===[ Mongodb Error ]=== */
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new CustomAPIError(message, StatusCodes.BAD_REQUEST);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
}