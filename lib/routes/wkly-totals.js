const router = require('express').Router();
const bodyParser = require('body-parser').json(); // eslint-disable-line no-unused-vars
const TimeBlock = require('../models/timeblock');

router.get('/', (req, res, next) => {

  let param = req.query.by || 'activity';

  if (param === 'activity') {

    TimeBlock.aggregate([
      // { $match: { userId: 1 }}, 
      { 
        $project: {
          activity: 1, 
          duration: { 
            $divide: [ { $subtract: ['$endTime', '$startTime'] }, 3600000 ]
          }
        }
      }, 
      {
        $group: { _id: '$activity', total: { $sum: '$duration' }}
      }
    ])
      .then(results => {
        
        // console.log('results ', results);
        const hrs_by_activity = { activity: [], hrs: [] };
        results.forEach((activity) => {
          hrs_by_activity['activity'].push(activity._id);
          hrs_by_activity['hrs'].push(activity.total);
        });
        res.send(hrs_by_activity);
      })
      .catch(next);
  }
  else {

    TimeBlock.aggregate([
      // { $match: { userId: 1 }}, 
      { 
        $project: {
          domain: 1, 
          duration: { 
            $divide: [ { $subtract: ['$endTime', '$startTime'] }, 3600000 ]
          }
        }
      }, 
      {
        $group: { _id: '$domain', total: { $sum: '$duration' }}
      }
    ])
      .then(results => {
        console.log('results ', results);
        const hrs_by_domain = { domain: [], hrs: [] };
        results.forEach((domain) => {
          hrs_by_domain['domain'].push(domain._id);
          hrs_by_domain['hrs'].push(domain.total);
        });
        res.send(hrs_by_domain);
      })
      .catch(next);

  }

});

module.exports = router;