const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const TimeBlock = require('../models/timeblock');

router
    .put('/mine', bodyParser, (req, res, next) => {

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
          // handle domains

          if (!user.domains) {
            user.domains = req.body.domains;
          }
          else if (req.body.domains) {
            updateSubDoc(user.domains, req.body.domains);
          }

          return user.save();
        })
        .then(saved => res.json(saved))
        .catch(err => {
          next(err);
        });
      
    })

//refactor to only send activities and domains
//TODO: Change route to better name
    .get('/mine', (req, res, next) => {
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
    })

    .get('/:userId/timeblocks', (req, res, next) => {
      const userId = req.params.userId;
      TimeBlock.find(req.user.id.toString)
        .lean()
        .then(blocks => {
          if (!blocks) {
            throw {
              code: 404, 
              error: 'Not found'
            };
          } else {
            return res.send(blocks);
          }
        })
        .catch(next);
    });

module.exports = router;