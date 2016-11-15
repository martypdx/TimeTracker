const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const TimeBlock = require('../models/timeblock');

router.get('/:userid/timeblocks', (req, res, next) => {
  
});