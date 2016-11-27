// these are api tests, but doesn't match your file naming convention. 
const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('Summary data route', () => {

  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if(connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  const request = chai.request(app);
  let token = '';

  // Adding a dummy user to generate token
  // TODO: uncomment lines that set auth token
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
    //might need userId once we add authorization
    startTime: new Date(2016, 11, 15, 12),
    endTime: new Date(2016, 11, 15, 13),
    description: 'lunch with friends',
    activity: 'eating',
    domain: 'social'
  };

  // this is really setup, so 1) use `before` instead of `it`,
  it('post', done => {
    request
      .post('/api/timeblocks')
      .set('Authorization', token)
      .send(testBlock)
      .then(res => {
        const block = res.body;
        // and 2) you don't need to retest this here 
        // because already tested in timeblock-api-test.js
        expect(block._id).to.be.ok;
        expect(block.userId).to.be.ok;
        testBlock = block;
        done();
      })
      .catch(done);
  });
  
  // these three tests could be combined into one, but
  // bigger issue is that they don't test any math and
  // correctness of "weekly totals", just 
  // existence, data type (array) and length of array.
  it ('/api/wkly_totals?by=activity returns three data sets', done => {
    request
      .get('/api/wkly_totals?by=activity')
      .set('Authorization', token)
      .then((res) => {
        expect(res.body.category).to.be.ok;
        expect(res.body.hrs).to.be.ok;
        expect(res.body.target).to.be.ok;
        done();
      })
      .catch(done);
  });

  it ('/api/wkly_totals?by=activity returned datasets should be arrays', done => {
    request
      .get('/api/wkly_totals?by_activity')
      .set('Authorization', token)
      .then((res) => {
        expect(res.body.category instanceof Array).to.be.ok;
        expect(res.body.hrs instanceof Array).to.be.ok;
        expect(res.body.target instanceof Array).to.be.ok;
        done();
      })
      .catch(done);
  });

  it ('/api/wkly_totals?by=activity returned arrays are all the same length', done => {
    request
      .get('/api/wkly_totals?by_activity')
      .set('Authorization', token)
      .then((res) => {
        const expected_length = res.body.category.length;
        expect(res.body.hrs.length).to.equal(expected_length);
        expect(res.body.target.length).to.equal(expected_length);
        done();
      })
      .catch(done);
    
  });

});