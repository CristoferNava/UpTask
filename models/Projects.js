const Sequilize = require('sequelize');
const db = require('../config/db');

const Projects = db.define('Projects', {
  id: {
    type: Sequilize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequilize.STRING,
  url: Sequilize.STRING
});

module.exports = Projects;