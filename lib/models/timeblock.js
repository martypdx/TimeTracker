const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  description: {
    type: String,
    required: true
  },
  activity: {
    type: String
  },
  domain: {
    type: String
  }
  
});

// added as example for cleaning up time-blocks.js router
schema.methods.isOwner = function(userId) {
  return this.userId === userId.toString();
};

module.exports = mongoose.model('TimeBlock', schema);