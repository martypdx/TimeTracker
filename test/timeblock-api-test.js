const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('TimeBlock', () => {
  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if(connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  const request = chai.request(app);
  let token = '';

  // Adding a dummy user to generate token
  before(done => {
    request
      .post('/api/auth/signup')
      .send({username: 'testUser', password: 'testPassword'})
      .then(res => {
        expect(token = res.body.token).to.be.ok;
        done();
      })
      .catch(done);
  });

  let testBlock = {
    startTime: new Date(2016, 11, 15, 12),
    endTime: new Date(2016, 11, 15, 13),
    description: 'lunch with friends',
    activity: 'eating',
    domain: 'social'
  };

  it('post', done => {
    request
      .post('/api/timeblocks')
      .set('Authorization', token)
      .send(testBlock)
      .then(res => {
        const block = res.body;
        expect(block._id).to.be.ok;
        expect(block.userId).to.be.ok;
        testBlock = block;
        done();
      })
      .catch(done);
  });
  
  
  it('put', done => {
    let newDescription = 'had lunch with Mark';

    //moment js to deal with time

    request
      .put(`/api/timeblocks/${testBlock._id}`)
      .set('Authorization', token)
      .send({description: newDescription})
      .then(res => {
        const block = res.body;
        expect(block.description).to.equal(newDescription);
        testBlock = block;
        done();
      })
      .catch(done);

  });

  it('throws 403 on put with bad token', done => {
    let newDescription = 'had lunch with Mark';

    request
      .put(`/api/timeblocks/${testBlock._id}`)
      .set('Authorization', 'badtoken')
      .send({description: newDescription})
      .then(() => {
        done('should not be 200, ok');
      })
      .catch(err => {
        expect(err).to.be.ok;
        done();
      })
      .catch(done);

  });

  it('get', done => {
    request
      .get(`/api/timeblocks/${testBlock._id}`)
      .set('Authorization', token)
      .then(res => {
        const block = res.body;
        expect(block).to.eql(testBlock);
        done();
      })
      .catch(done);
  });

  it('get', done => {
    request
      .get(`/api/timeblocks/${testBlock._id}`)
      .set('Authorization', 'badtoken')
      .then(()=> {
        done('should not be 200, OK');
      })
      .catch(err => {
        expect(err).to.be.ok;
        done();
      })
      .catch(done);
  });

  it('delete', done => {
    request
      .del(`/api/timeblocks/${testBlock._id}`)
      .set('Authorization', token)
      .then(res => {
        expect(res.body).to.eql(testBlock);
        return;
      })
      .then(() => {
        return request
          .get(`/api/timeblocks/${testBlock._id}`)
          .set('Authorization', token)
          .then(res => {
            // should this be a failure?
            console.log('res.body', res.body);
          })
          .catch(err => {
            expect(err).to.be.ok;
            done();
          });
      })
      .catch(done);
  });

  it('throws err if given invalid token on delete', done => {
    request
      .del(`/api/timeblocks/${testBlock._id}`)
      .set('Authorization', 'badtoken')
      .then(() => {
        done('should not be 200, OK');
        return;
      })
      .catch(err => {
        expect(err).to.be.ok;
        return done();
      })
// should refactor to test for whether block was deleted if given bad token. (which it shouldn't')
      .catch(done);
  });
  

});