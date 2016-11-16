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

  let testUserB = {
    username: 'radDude',
    password: 'reallyradpassword',
    activities: {cooking: 7, sleeping: 7, meals: 7},
    domains: {'self-care': 20}
  };

  let timeBlockA = {
    description: 'run up Mt. Tabor',
    startTime: new Date(2016, 10, 15, 12), 
    endTime: new Date(2016, 10, 15, 13), 
    activity: 'running',
    domain: 'health'
  };

  let timeBlockB = {
    description: 'go on a bike ride',
    startTime: new Date(2016, 10, 15, 20),
    endTime: new Date(2016, 10, 15, 21)
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
        console.log('res', res.body);
        expect(res.body.activities).to.include.key('swimming');
        expect(res.body.activities).to.include.key('running');
        expect(res.body.domains).to.include.key('triathlon');
        expect(res.body.domains).to.include.key('health');
        done();
      })
      .catch(done);
  });
});