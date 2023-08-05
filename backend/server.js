const express = require('express');
const app = require('./app');
const connect = require('./db/connect');
const productRouter = require('./routes/product');

/* ===[ Config ]=== */
require('dotenv').config({
  path: 'backend/config/config.env'
});

/* ===[ Middlewares ]=== */
app.use(express.json());

/* ===[ Routes ]=== */
app.use('/api/v1/product', productRouter);

const port = process.env.PORT || 3000;

const server = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log('server running at http://localhost:%d/api/v1/product', port);
    });
  } catch(error) {
    console.log(error);
  }
}

server();