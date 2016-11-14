const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activities: {
    // TODO: draw out childSchema activities 
  },
  domains: {
    // TODO: draw out childSchema domains
  }
}, {
  // schema-level options here
});

module.exports = mongoose.model('User', schema);