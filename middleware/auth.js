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
        return next();
      });
    })(req, res, next);
  };
}
// Middleware to ensure a user is logged in
function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    // If the user is logged in, continue to the next middleware or route handler
    return next(); 
  }
  // If not logged in, redirect them to the login page with a flash message
  req.flash('error', 'Please log in to view this resource.');
  res.redirect('/signin');
}
module.exports = {
  login: createLoginMiddleware('local'),
  ensureAuthenticated
};