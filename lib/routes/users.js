const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const TimeBlock = require('../models/timeblock');

router
    .put('/', bodyParser, (req, res, next) => {

      User.findById(req.user.id.toString())
        .then(user => {
          function updateSubDoc(user, body) {
            for (var key in body) {
              user[key] = body[key];
            }
          }
          // handle activities
          console.log(0, user.activities);
          if (!user.activities) {
            user.activities = req.body.activities;
          }
          else if (req.body.activities) {

            var newActivities = user.activities;

            for (var key in req.body.activities) {
              newActivities[key] = req.body.activities[key];
            }

            console.log(1, req.body.activities);
            console.log(2, newActivities);
            console.log(3, user.activities);
            user.activities = newActivities;

            console.log(4, user.activities);

            // return user.update();
            // updateSubDoc(user.activities, req.body.activities);
          }
          // handle domains

          if (!user.domains) {
            user.domains = req.body.domains;
          }
          else if (req.body.domains) {
            updateSubDoc(user.domains, req.body.domains);

          }

          console.log(5,user);

          

          console.log(6, user);
          return user.update({new: true}, (err, obj, num) => {
            console.log('err', err);
            console.log('obj', obj);
            console.log('num', num);
            res.json(obj);
          });
        })
        // .then(saved => res.json(saved))
        .catch(err => {
          next(err);
        });
      
    })

//refactor to only send activities and domains
//TODO: Change route to better name
    .get('/', (req, res, next) => {
      User.findById(req.user.id.toString())
      .then(user => {
        if (!user) {
          throw {
            code: 404,
            error: 'Not found'
          }; 
        } else {
          return res.send(user);
        }
      })
      .catch(next);
    });

    

module.exports = router;