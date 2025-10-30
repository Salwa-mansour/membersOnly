const passport = require('passport');
/**
 * Creates a login middleware for Passport.js
 * @param {string} strategy - The Passport strategy to use (e.g., 'local')
 */
function createLoginMiddleware(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        // Handle server errors
        return next(err);
      }
      if (!user) {
        // Authentication failed
        req.flash('error', info.message);
        req.flash('oldEmail', req.body.email);
        return res.redirect('/signin');
      }
      
      // Authentication succeeded
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  };
}

module.exports = {
  login: createLoginMiddleware('local')
};