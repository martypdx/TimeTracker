const expect = require('chai').expect;
const User = require('../lib/models/user.js');

describe('User model', () => {
  it('validates with username and password', done => {
    const user = new User({
      username: 'testing username',
      password: 'testing password'
    });

    user.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('username and password is required', done => {
    const user = new User({password: 'testItem'});

    user.validate(err => {
      expect(err).to.be.ok;
      done();
    });
  });

});