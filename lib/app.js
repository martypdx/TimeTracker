const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const timeBlocks = require('./routes/time-blocks');
const users = require('./routes/users');
const auth = require('./routes/auth');
const wkly_totals = require('./routes/wkly-totals');

app.use(morgan('dev'));

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.use('/api/auth', auth);
app.use('/api/timeblocks', timeBlocks);
app.use('/api/users', users);

// merge in development here
app.use('/api/wkly_totals', wkly_totals);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const error = (err.code === 500) ? 'Internal server error' : err.error;
  
  res.status(code).send({ error });
});

module.exports = app;