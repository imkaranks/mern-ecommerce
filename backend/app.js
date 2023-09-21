/* ===[ Config ]=== */
require('dotenv').config({
  path: 'backend/config/config.env'
});

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');
const paymentRouter = require('./routes/payment');

/* ===[ Error Handler ]=== */
const errorHandlerMiddleware = require('./middlewares/error-handler');

/* ===[ Extra Packages ]=== */
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

/* ===[ Routes ]=== */
app.use('/api/v1/product', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);

app.use(errorHandlerMiddleware);

module.exports = app;