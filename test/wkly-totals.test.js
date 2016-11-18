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
  
  it ('/api/wkly_totals?by=activity returns three arrays', (done) => {
    request
      .get('/api/wkly_totals?by=activity')
      .set('Authorization', token)
      .then((res) => {
        expect(res.body['category']).to.be.ok;
        expect(res.body['hrs']).to.be.ok;
        expect(res.body['target']).to.be.ok;
        done();
      })
      .catch(done);
  });

  it ('/api/wkly_totals?by=activity first returned array contains strings', (done) => {
    request
      .get('/api/wkly_totals?by_activity')
      .set('Authorization', token)
      .then((res) => {
        console.log(typeof res.body['category']);
        expect(typeof res.body['category']).to.equal('Array');
        done();
      })
      .catch(done);
  });

  it.skip ('/api/wkly_totals?by=activity second returned array contains numbers', () => {

  });

});