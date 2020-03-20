const passport = require('passport');

exports.authenticateUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios'
});

exports.userAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next(); // next middleware (the page of the request)

  // if the user is not authenticated
  return res.redirect('/sign-in');
};

exports.logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};