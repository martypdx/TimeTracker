const expect = require('chai').expect;
const User = require('../lib/models/user.js');

describe('User model', () => {
  it('validates with username and password', done => {
    const user = new User({
      username: 'testing username',
      password: 'testing password'
    });

    user.validate(done);
  });

  // DRY: extract functions for common behavior,
  // function name helps add descriptive info
  // (and you could also then extract this to own module
  // and use in timeblock.test.js as well...)
  function testModelIsInvalid(model, cb) {
    model.validate(err => {
      expect(err).to.be.ok;
      cb();
    });
  } 

  it('username is required', done => {
    const user = new User({password: 'testItem'});
    testModelIsInvalid(user, done);
  });

  it('password is required', done => {
    const user = new User({username: 'testItem'});
    testModelIsInvalid(user, done);
  });


});