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
      errors: error.errors // error.errors obetenido de sequilize
    }); 
  }
};