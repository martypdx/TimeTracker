const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);

const assert = chai.assert;
const app = require('../lib/app');
const connection = require('../lib/setup-mongoose');

const request = chai.request(app);

describe('Auth', () => {


  describe.skip('unauthorized', () => {
    it('returns 400 w/o a token', done => {        
      request
        .get(
            //TODO: add path to test after sign in that only allows an authorized user to see it
            '/'
        )
        .then(() => done('status should not be 200, OK'))
        .catch(res => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body.error, 'Unauthorized, no token provided');
        });
    });

    it('returns 403 w/ invalid token', done => {
      request
        .get('/'
        //TODO: add path to test after sign in that only allows an authorized user
        )
        .set('Authorization', 'bad-token')
        .then(() => done('status should not be 200, OK'))
        .catch(res => {
          assert.equal(res.status, 403);
          assert.equal(res.response.body.error, 'Unauthorized, invalid token');
        });
    });
  });

  const testUser = {
    username: 'coolkid',
    password: 'reallygoodpassword'
  };

  describe('user management', () => {

    before(done => {
      const drop = () => connection.db.dropDatabase(done);
      if(connection.readyState === 1) drop();
      else connection.on('open', drop);
    });

    const badRequest = (url, send, error) => {
      return request
        .post(url)
        .send(send)
        .then(
          () => { throw new Error('status should not be 200, OK');},
          res => {
            assert.equal(res.status, 400);
            assert.equal(res.response.body.error, error);
          }
        );
    };

    it('requires a username for signup', () => {
      badRequest('/api/auth/signup', {password: 'reallybadpassword'}, 'Username and password must be supplied');
    });

    it('requires a password for signup', () => {
      badRequest('/api/auth/signup', {username: 'radPerson'}, 'Username and password must be supplied');
    });

    let token = '';

    it('executes signup', () => {
      return request
        .post('/api/auth/signup')
        .send(testUser)
        .then(res => {
          console.log(token);
          assert.ok(token = res.body.token);
        });
    });

    it('ensures that there is no duplication of usernames', () => {
      badRequest('/api/auth/signup', testUser, 'Username coolkid already exists');
    });

    it('verifies token is valid', () => {
      return request 
        .get('/api/auth/validate')
        .set('Authorization', token)
        .then(res => {
          assert.ok(res.body);
        });
    });

    it('executes signin', () => {
      return request 
        .post('/api/auth/signin')
        .send(testUser)
        .then( res => {
          assert.ok(res.body.token);
        });
    });

  });
});