const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

const eventRoutes = require('./routes/event');

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use('/', eventRoutes);

mongoConnect(() => {
  app.listen(4000);
});
