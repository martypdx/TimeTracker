const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

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

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
