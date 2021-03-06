const Sequilize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Projects = require('./Projects');

const Users = db.define('Users', {
  id: {
    type: Sequilize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequilize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Debes agregar un email válido' // en caso de que no sea un correo
      },
      notEmpty: {
        msg: 'El campo de email no puede ir vacío'
      }
    },
    unique: {
      args: true,
      msg: 'Usuario ya registrado',
    }
  },
  password: {
    type: Sequilize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo no puede ir vacío'
      }
    }
  },
  token: Sequilize.STRING,
  expiration: Sequilize.DATE
}, {
  hooks: {
    beforeCreate(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    }
  }
});

// own methods
Users.prototype.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

Users.hasMany(Projects);

module.exports = Users;