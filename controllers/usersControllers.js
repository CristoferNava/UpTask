const Users = require('../models/Users')

exports.showSignUp = (req, res) => {
  res.render('signUp');
};

exports.createUser = (req, res) => {
  // podemos usar async/await o then y catch
  const {email, password} = req.body;
  Users.create({
    email,
    password
  })
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err);
  });
};