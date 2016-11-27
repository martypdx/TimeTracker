const mongoose = require('mongoose');
// this doesn't belong here, it's a one time setup that happens in `setup-mongoose`
//mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activities: {},
  domains: {}
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.addActivites = function(activities) {
  updateCollection(this, 'activities', activities);
};

userSchema.methods.addDomains = function(domains) {
  updateCollection(this, 'domains', domains);
};

// function moves here and is used by above methods:
function updateCollection(user, collectionName, newCollection) {
  if (!user[collectionName]) {
    user[collectionName] = newCollection;
  }
  else if (newCollection) {
    Object.assign(user[collectionName], newCollection);
    user.markModified(collectionName);
  }
}
 
module.exports = mongoose.model('User', userSchema);
