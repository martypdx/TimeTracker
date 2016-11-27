const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const TimeBlock = require('../models/timeblock');

router

  .post('/', bodyParser, (req, res, next) => {
    // nice job enforcing ownership of the timeblock
    // based on token rather than passed in data!
    req.body.userId = req.user.id;
    new TimeBlock(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    TimeBlock.findById(req.params.id)
      .then(block => {
        // not only is using method less code, it now 
        // describes "why" we are comparing the values
        if (block.isOwner(req.user.id)) {
          const { body } = req;
          // remove fields not allowed to update, ie:
          delete body.userId;
          Object.assign(block, body);
          return block.save();
        } else {
          throw {
            code: 403,
            error: 'Unauthorized'
          };
        }
      })
      .then(saved => res.json(saved))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    TimeBlock.findById(req.params.id)
      .then(block => {
        if (block.isOwner(req.user.id)) {
          return block.remove();
        } else {
          throw {
            code: 403,
            error: 'Unauthorized'
          };
        }
      })
      .then(deleted => res.json(deleted))
      .catch(next);
  })

  .get('/users', (req, res, next) => {
    var userId = req.user.id.toString();
    TimeBlock.findById(userId)
        .lean()
        .then(blocks => {
          if (!blocks) {
            throw {
              code: 404, 
              error: 'Not found'
            };
          } else {
            return res.json(blocks);
          }
        })
        .catch(next);
  })

  .get('/:id', (req, res, next) => {
    // the other option for enforcing ownership would have been
    // adding it to the query, ie
    // TimeBlock.find({ _id: req.params.id, userId: req.user.id })
    // (downside is you wouldn't be able to distinguish 
    // between "not found" and "not owner")

    TimeBlock.findById(req.params.id)
      .then(timeblock => {
        if (!timeblock) {
          throw {
            code: 404, 
            error: 'Not found'
          };
        } else if (timeblock.isOwner(req.user.id)) {
          return res.send(timeblock);
        } else {
          throw {
            code: 403,
            error: 'Unauthorized'
          };
        }
      })
      .catch(next);

    
  });



module.exports = router;


  