const mongoose = require('mongoose');
mongoose.Promise = Promise;
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
  
}, {
  // schema-level options here
});

module.exports = mongoose.model('TimeBlock', schema);