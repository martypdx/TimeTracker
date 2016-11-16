const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const wkly_totals = require('./routes/wkly-totals');

app.use(morgan('dev'));

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.use('/api/wkly_totals', wkly_totals);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const error = (err.code === 500) ? 'Internal server error' : err.error;
  res.status(code).send({ error });
});

module.exports = app;