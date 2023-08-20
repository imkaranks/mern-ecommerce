const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');

/* ===[ Error Handler ]=== */
const errorHandlerMiddleware = require('./middlewares/error-handler');

/* ===[ Extra Packages ]=== */
app.use(express.json());
app.use(cookieParser());

/* ===[ Handle CORS (For Development) ]=== */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* ===[ Routes ]=== */
app.use('/api/v1/product', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/order', orderRouter);

app.use(errorHandlerMiddleware);

module.exports = app;