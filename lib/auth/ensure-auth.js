const token = require('./token');

// TODO: Require in ensure-auth to app.js

module.exports = function getEnsureAuth() {

  return function ensureAuth(req, res, next) {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
      return next({
        code: 400,
        error: 'Unauthorized, no token provided'
      });
    }

    token.verify(authHeader)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(err => { // eslint-disable-line no-unused-vars
        return next({
          code: 403,
          error: 'Unauthorized, invalid token'
        });
      });
  };
};
