const express = require('express');
const app = express();
const productRouter = require('./routes/product');

/* ===[ Error Handler ]=== */
const errorHandlerMiddleware = require('./middlewares/error-handler');

/* ===[ Extra Packages ]=== */
app.use(express.json());

/* ===[ Routes ]=== */
app.use('/api/v1/product', productRouter);

app.use(errorHandlerMiddleware);

module.exports = app;