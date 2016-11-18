const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const TimeBlock = require('../models/timeblock');

router

  .post('/', bodyParser, (req, res, next) => {
    req.body.userId = req.user.id;
    new TimeBlock(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })



  .put('/:id', bodyParser, (req, res, next) => {
    TimeBlock.findById(req.params.id)
      .then(block => {
        if (req.user.id === block.userId.toString()) {
          for (var key in req.body) {
            block[key] = req.body[key];
          }
          console.log(block);
          return block.save();
        } else {
          throw {
            code: 403,
            error: 'Unauthorized, invalid token'
          };
        }
      })
      .then(saved => res.json(saved))
      .catch(next);
  })


  // .delete('/:id', (req, res, next) => {

  //   //TODO: if nothing to delete throw a 404
  //   TimeBlock.findByIdAndRemove(req.params.id)
  //     .then(deleted => res.send(deleted))
  //     .catch(next);
  // })

  .delete('/:id', (req, res, next) => {
    TimeBlock.findById(req.params.id)
      .then(block => {
        if (req.user.id === block.userId.toString()) {
          return block.remove();
        } else {
          throw {
            code: 403,
            error: 'Unauthorized, invalid token'
          };
        }
      })
      .then(deleted => res.json(deleted))
      .catch(next);
  })

  .get('/users', (req, res, next) => {
    console.log(req.user.toString());
    let userId = req.user.id.toString();
    TimeBlock.find({userId})
        .lean()
        .then(blocks => {
          console.log(blocks);
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
    TimeBlock.findById(req.params.id)
      .then(timeblock => {
        if (!timeblock) {
          throw {
            code: 404, 
            error: 'Not found'
          };
        } else if (req.user.id === timeblock.userId.toString()) {
          return res.send(timeblock);
        } else {
          throw {
            code: 403,
            error: 'Unauthorized, invalid token'
          };
        }
      })
      .catch(next);

    
  });



module.exports = router;


  