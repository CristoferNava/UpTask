const Users = require('../models/Users')
const crypto = require('crypto');
const Sequilize = require('sequelize');
const Op = Sequilize.Op;
const bcrypt = require('bcrypt-nodejs');
const sendEmail = require('../handlers/email');

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

// generate a token if the user exists
exports.generateToken = async (req, res) => {
  // get the email
  const {email} = req.body;
  const user = await Users.findOne({where: {email}});

  // if the user does not exist
  if (!user) {
    res.render('resetPassword', {
      error: 'Cuenta no encontrada. Verifica el correo'
    });
  }
 
  // if the user exists generate the token and a expiration time
  user.token = crypto.randomBytes(20).toString('hex');
  user.expiration = Date.now() + 3600000; // We give it an hour

  // save the user information in the database
  await user.save();

  // generate the url to reset the password
  const resetPassURL = `http://${req.headers.host}/reset-password/${user.token}`;
  
  // send the email to the user
  await sendEmail.send({
    user,
    subject: 'Restablecer Contraseña Test',
    resetPassURL,
    emailView: 'resetPasswordEmail'
  });
};

exports.sendToken =  async (req, res) => {
  const user = await Users.findOne(
    {where: {token: req.params.token}}
  );
  
  // if the user does not exist
  if (!user) {
    req.flash('error', 'Enlace no válido'); // ufff, flash-connect is awesome
    res.redirect('/sign-in');
  }

  // if the user exists we render the page to set a new password
  res.render('setNewPassword');
};

exports.setNewPassword = async (req, res) => {
  // get the user token
  const {token} = req.params;
  const user = await Users.findOne({
    where: {
      token,
      expiration: {
        [Op.gte]: Date.now() // greater than
      }
    }
  });

  // check if the user does not exist
  if (!user) {
    req.flash('error', 'El enlace ha expirado');
    res.redirect('/reset-password');
  }

  // if the user exists we hash the new password
  // params for what we define in the routes
  // body for what it sends to the controller
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  user.token = null;
  user.expiration = null;

  // save the new data into the database
  await user.save();

  req.flash('pollo', 'Contraseña Reestablecida');
  res.redirect('/sign-in');
};