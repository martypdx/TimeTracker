const chai = require('chai');
const expect = chai.expect;

describe ('Travis CI infrastructure', () => {

  it ('runs this test using Travis CI', () => {
    expect(true).to.be.ok;
  });

  it ('runs another test using Travis', () => {
    expect(false).to.not.be.ok;
  });

});

