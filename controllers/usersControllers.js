const Users = require('../models/Users')

exports.showSignUp = (req, res) => {
  res.render('signUp');
};

exports.createUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    await Users.create({
      email,
      password
    });
    res.redirec('/signUp');
  } catch (error) {
    res.render('signUp', {
      errors: error.errors, // error.errors obetenido de sequilize
      email,
      password
    }); 
  }
};

exports.showSignIn = (req, res) => {
  const {error} = res.locals.messages;
  res.render('signIn', {
    error
  });
};

exports.showResetPassword = (req, res) => {
  res.render('resetPassword');
};