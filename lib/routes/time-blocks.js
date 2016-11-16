const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const TimeBlock = require('../models/timeblock');
const extractId = require('../auth/extract-id');

router

  .post('/', bodyParser, (req, res, next) => {
    new TimeBlock(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser,(req, res, next) => {
    TimeBlock.findByIdAndUpdate(req.params.id,
    req.body, {new: true})
      .then(saved => res.send(saved))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {

    //TODO: if nothing to delete throw a 404
    TimeBlock.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    TimeBlock.findById(req.params.id)
      .then(timeblock => {
        extractId(req);

        if (!timeblock) {
          throw {
            code: 404, 
            error: 'Not found'
          };
        } else {
          return res.send(timeblock);
        }    
      })
      .catch(next);
  });

  module.exports = router;


  