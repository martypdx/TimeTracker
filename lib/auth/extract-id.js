// This file isn't used AFAICT, remove it...

const token = require('./token');

// takes a request object, verifies the token and returns the id on the payload
// error if given no token or a bad token
module.exports = function (req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw {
      code: 400,
      error: 'Unauthorized, no token provided'
    };
  }

  return token.verify(authHeader)
      .then(payload => {
        return payload.id;
      })
      .catch(err => { // eslint-disable-line no-unused-vars
        throw {
          code: 403,
          error: 'Unauthorized, invalid token'
        };
      });
};
