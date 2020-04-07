const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Reference to the model
const Users = require('../models/Users');

// local strategy for log in using a username and a password
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({
          where: {email: email}
        });
        // if the user exists but the password is incorrect
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: 'Contraseña incorrecta'
          });
        }
        // if the user exists and the password is correct
        return done(null, user);
      } catch (error) {
        // if the user does not exit in the DataBase
        return done(null, false, {
          message: 'No existe una cuenta con ese correo'
        });
      }
    }
  )
);

// we have to serialize the user
passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

module.exports = passport;