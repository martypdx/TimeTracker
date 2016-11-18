const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');

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
          if (!user.activities) {
            user.activities = req.body.activities;
          }
          else if (req.body.activities) {
            updateSubDoc(user.activities, req.body.activities);
          }

          var {activities} = user;
          user.activities = Object.create(null);
          user.activities = activities;

//        handle domains
          if (!user.domains) {
            user.domains = req.body.domains;
          }
          else if (req.body.domains) {
            updateSubDoc(user.domains, req.body.domains);

          }

          var {domains} = user;
          user.domains = Object.create(null);
          user.domains = domains;

                
          return user.save({new: true}, (err, obj) => {
            res.json(obj);
          });
        })
        .catch(err => {
          next(err);
        });
      
    })

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