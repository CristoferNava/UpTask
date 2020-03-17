const Sequilize = require('sequelize');
const db = require('../config/db');
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
});
Users.hasMany(Projects);
module.exports = Users;