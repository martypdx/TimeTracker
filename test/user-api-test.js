const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);

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

    activities: {email: 7, running: 5, sleeping: 56, meals: 15},
    domains: {health: 20, work: 20}
  };


  let token = '';

  // Adding a dummy user to generate token
  // TODO: uncomment lines that set auth token
  before(done => {
    request
      .post('/api/auth/signup')
      .send({username: 'testUser', password: 'testPassword'})
      .then(res => {
        expect(token = res.body.token).to.be.ok;
        return request
          .put('/api/users/mine')
          .set('Authorization', token)
          .send(testUserA)
          .then(() => {
            done();
          });
      })
      .catch(done);
  });


//we're going to update to only send activities and domains (not username and password)  
  it('gets a user', done => {
    request
      .get('/api/users/mine')
      .set('Authorization', token)
      .then(res => {
        expect(res.body.activities).to.eql(testUserA.activities);
        done();
      })
      .catch(done);
  });

  it('updates a user', done => {
    request
      .put('/api/users/mine')
      .set('Authorization', token)
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