const expect = require('chai').expect;
const TimeBlock = require('../lib/models/timeblock.js');

describe('Timeblock model', () => {

  it('validates with description and starttime ', done => {
    const timeBlock = new TimeBlock({
      startTime: new Date(),
      description: 'test description'
    });

    timeBlock.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('startTime and description is required', done => {
    const timeBlock = new TimeBlock({description: 'testItem'});

    timeBlock.validate(err => {
      expect(err).to.be.ok;
      done();

    });
  });

});
