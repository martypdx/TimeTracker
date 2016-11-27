const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');

router
    .put('/', bodyParser, (req, res, next) => {

      User.findById(req.user.id.toString())
        .then(user => {
          // FYI, 2) Object.assign does what this function does
          // function updateSubDoc(activities, body) {
          //   // 1) Don't use for/in unless you specifically
          //   // mean to walk the prototype chain. Use Object.keys:
          //   Object.keys(body).forEach(key => activities[key] = body[key]);
          // }

          const { activities, domains } = req.body;

          // 3) DRY: Since the same thing is happening to both activities and domains, 
          // encapsulate in a function:
          // function updateCollection(user, collectionName, newCollection) {
          //   if (!user[collectionName]) {
          //     user[collectionName] = newCollection;
          //   }
          //   else if (newCollection) {
          //     Object.assign(user[collectionName], newCollection);
          //     user.markModified(collectionName);
          //   }
          // }
          // updateCollection(user, 'activities', activities);
          // updateCollection(user, 'domains', domains);

          // 4) And then it becomes easy to move that functionality to the user object,
          // making the code here even simpler:

          user.addActivites(activities);
          user.addDomains(domains);

                
          // Don't mix promises and callbacks, chain this:
          return user.save({new: true});
        })
        .then(user => res.json(user))
        .catch(next);
      
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