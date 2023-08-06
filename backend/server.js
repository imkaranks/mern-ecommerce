const express = require('express');
const app = require('./app');
const connect = require('./db/connect');

/* ===[ Handling Uncaught Exception ]=== */
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting the server down due to uncaught exception");
  process.exit(1);
});

/* ===[ Config ]=== */
require('dotenv').config({
  path: 'backend/config/config.env'
});

const port = process.env.PORT || 3000;
let server;

const startServer = async () => {
  try {
    await connect(process.env.MONGO_URI);
    server = app.listen(port, () => {
      console.log('server running at http://localhost:%d/api/v1/product', port);
    });
  } catch(error) {
    console.log(error);
  }
}

startServer();

/* ===[ Unhandled Promise Rejection ]=== */
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting the server down due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});