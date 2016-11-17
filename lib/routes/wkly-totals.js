const router = require('express').Router();
const bodyParser = require('body-parser').json(); // eslint-disable-line no-unused-vars
const TimeBlock = require('../models/timeblock');
const extractId = require('../auth/extract-id');
const User = require('../models/user');

router.get('/', (req, res, next) => {

  console.log('Started request', req.query);

  let param = req.query.by || 'activity';

  const userId = req.user.id;
  let userActivities = {};

  User.findById(userId).then(user => { 
    userActivities = user.activities;
    userDomains = user.domains;

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
          
          const hrs_by_activity = { activity: [], hrs: [], target: [] };
          results.forEach((activity) => {
            if(userActivities[activity._id]){
              hrs_by_activity['activity'].push(activity._id);
              hrs_by_activity['hrs'].push(activity.total);
              hrs_by_activity['target'].push(userActivities[activity._id]);
            }
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
     
          const hrs_by_domain = { domain: [], hrs: [], target: [] };
          results.forEach((domain) => {
            if(userDomains[domain._id]){
              hrs_by_domain['domain'].push(domain._id);
              hrs_by_domain['hrs'].push(domain.total);
              hrs_by_domain['target'].push(userDomains[domain._id]);
            }
          });
          res.send(hrs_by_domain);
        })
        .catch(next);
    }
  });

});

module.exports = router;
