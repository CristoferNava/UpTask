const Sequilize = require('sequelize');
const db = require('../config/db');
const Projects = require('./Projects');

const Tasks = db.define('Tasks', {
  id: {
    type: Sequilize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  task: Sequilize.STRING(100),
  state: Sequilize.INTEGER(1)
});
// Usamos la llave foranea
Tasks.belongsTo(Projects);

module.exports = Tasks;