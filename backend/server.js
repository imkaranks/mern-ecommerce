const express = require('express');
const app = require('./app');
const connect = require('./db/connect');

/* ===[ Config ]=== */
require('dotenv').config({
  path: 'backend/config/config.env'
});

/* ===[ Routes ]=== */
app.get('/', (req, res) => {
  res.send("<h1>Server's Live!</h1>");
});

const port = process.env.PORT || 3000;

const server = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log('server running at http://localhost:%d', port);
    });
  } catch(error) {
    console.log(error);
  }
}

server();