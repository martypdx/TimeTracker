const router = require('express').Router();
const TimeBlock = require('../models/timeblock');
const User = require('../models/user');

router.get('/', (req, res, next) => {

  let by = req.query.by || 'activity';
  const userId = req.user.id;

  User.findById(userId).then(({ activites, domains }) => { 
    aggregate(by, userId)
      .then(totals => {
        // explicitly test and choose collection as going from singular to plural 
        // is not consistent, i.e. activity -> activities vs domain -> domains:
        const collection = by === 'activity' ? activites : domains;
        const pivotted = pivot(totals, collection);
        res.send(pivotted);
      })
      .catch(next);
  });
});

module.exports = router;

function aggregate(userId, by) {
  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return TimeBlock.aggregate([
    { $match: { userId }}, 
    // shouldn't domains have time period too?
    { $match: { endTime: { $gt: oneWeekAgo }}}, 
    { 
      $project: {
        // you probably didn't know this "dynamic field" trick, 
        // but alternative would be to break this out into object
        // and set the property the old fashion way, i.e. obj[by] = 1
        [by]: 1, 
        duration: { 
          $divide: [ { $subtract: ['$endTime', '$startTime'] }, 3600000 ]
        }
      }
    }, 
    {
      $group: { _id: `$${by}`, total: { $sum: '$duration' }}
    }
  ]);
}

// I think this pivot would have been better done on the 
// client because it's a very specific format required by the 
// charting library. You could include the extra details, like 
// then name, in the aggregation pipeline'
function pivot(results, collection) {
  const hrs_by = { category: [], hrs: [], target: [] };

  results.forEach(result => {
    if(collection[result._id]){
      hrs_by.category.push(result._id);
      hrs_by.hrs.push(result.total);
      hrs_by.target.push(collection[result._id]);
    }
  });

  return hrs_by;
}
