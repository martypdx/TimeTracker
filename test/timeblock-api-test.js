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

  //Adding a dummy user to generate token
  //TODO: uncomment lines that set auth token
  // before(done => {
  //   request
  //     .post('/auth/signup')
  //     .send({username: 'testUser', password: 'testPassword'})
  //     .then(res => {
  //       expect(token = res.body.token).to.be.ok;
  //       done();
  //     })
  //     .catch(done);
  // });

  let testBlock = {
    //might need userId once we add authorization
    startTime: new Date(2016, 11, 15, 12),
    endTime: new Date(2016, 11, 15, 13),
    description: 'lunch with friends',
    activity: 'eating',
    domain: 'social'
  };

  it('post', done => {
    request
      .post('/api/timeblocks')
      // .set('Authorization', token)
      .send(testBlock)
      .then(res => {
        const block = res.body;
        expect(block._id).to.be.ok;
        testBlock = block;
        done();
      })
      .catch(done);
  });

});