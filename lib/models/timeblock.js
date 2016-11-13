const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema();

const schema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'Domain'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  // schema-level options here
});

module.exports = mongoose.model('TimeBlock', schema);