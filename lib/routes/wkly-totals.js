const router = require('express').Router();
const bodyParser = require('body-parser').json(); // eslint-disable-line no-unused-vars
const TimeBlock = require('../models/timeblock');

router.get('/', (req, res, next) => {
  TimeBlock.aggregate([
    { $match: { userId: 1 }}, 
    { $project: { duration: { $subtract: ['$endTime', '$startTime']}}}, 
    { $group: { _id: '$activity', total: { $sum: '$duration' }}}
  ])
    .then(results => {
      res.send(results[0]);
    })
    .catch(next);

});

module.exports = router;