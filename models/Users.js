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
    allowNull: false
  },
  password: {
    type: Sequilize.STRING(60),
    allowNul: false
  }
}, {
  hooks: {
    beforeCreate(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    }
  }
});
Users.hasMany(Projects);
module.exports = Users;