const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);

const User = require('../lib/models/user');
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('Users', () => {
  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  const request = chai.request(app);

  let testUserA = {
    username: 'coolKid', 
    password: 'reallygoodpassword',
    activities: {email: 7, running: 5, sleeping: 56, meals: 15},
    domains: {health: 20, work: 20}
  };

//This creates a user with the original test password, not the hash
  before(done => {
    new User (testUserA).save()
    .then(user => {
      testUserA = user;
      return done();
    })
    .catch(done);
  });

//we're going to update to only send activities and domains (not username and password)  
  it('gets a user', done => {
    request
      .get(`/api/users/${testUserA._id}`)
      .then(res => {
        expect(res.body.activities).to.eql(testUserA.activities);
        done();
      })
      .catch(done);
  });

  it('updates a user', done => {
    request
      .put(`/api/users/${testUserA._id}`)
      .send({activities: {swimming: 2}, domains: {triathlon: 15}})
      .then( res => {
        expect(res.body.activities).to.include.key('swimming');
        expect(res.body.activities).to.include.key('running');
        expect(res.body.domains).to.include.key('triathlon');
        expect(res.body.domains).to.include.key('health');
        done();

      })
      .catch(done);
  });
});