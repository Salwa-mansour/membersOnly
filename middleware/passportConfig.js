const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries');


module.exports = function(passport) {
  // Local strategy for handling username/password login 
  passport.use(new LocalStrategy({ usernameField: 'email'  }
    , async (email, password, done) => {
    try {
      const user = await db.findByEmail(email);
   
      if (!user) {
      
         // Just return the result via done(). Do not use req.flash() here.
        return done(null, false, { message: 'Incorrect email ' });
      }
      const isMatch = await db.comparePassword(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Store user ID in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieve user object from the session using the ID
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
