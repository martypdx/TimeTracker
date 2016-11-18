const router = require('express').Router();
const bodyParser = require('body-parser').json(); // eslint-disable-line no-unused-vars
const TimeBlock = require('../models/timeblock');
const User = require('../models/user');

router.get('/', (req, res, next) => {

  console.log('Started request', req.query);

  let param = req.query.by || 'activity';

  const userId = req.user.id;
  let userActivities = {};
  let userDomains = {};

  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  console.log('oneWeekAgo ', oneWeekAgo);

  User.findById(userId).then(user => { 
    userActivities = user.activities;
    userDomains = user.domains;

    if (param === 'activity') {
      // console.log('req.user.id ', req.user.id);

      TimeBlock.aggregate([
        { $match: { userId: req.user.id /*, endDate: { $gt: oneWeekAgo } */ }}, 
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
          
          const hrs_by_activity = { category: [], hrs: [], target: [] };
          results.forEach((activity) => {
            if(userActivities[activity._id]){
              hrs_by_activity['category'].push(activity._id);
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
        { $match: { userId: req.user.id}}, 
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
     
          const hrs_by_domain = { category: [], hrs: [], target: [] };
          results.forEach((domain) => {
            if(userDomains[domain._id]){
              hrs_by_domain['category'].push(domain._id);
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
