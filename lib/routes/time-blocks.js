const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const TimeBlock = require('../models/timeblock');

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
    TimeBlock.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    TimeBlock.findById(req.params.id)
      .then(timeblock => res.send(timeblock))
      .catch(next);
  });


  