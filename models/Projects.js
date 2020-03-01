const Sequilize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Projects = db.define('Projects', {
  id: {
    type: Sequilize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequilize.STRING,
  url: Sequilize.STRING
}, {
  hooks: {
    beforeCreate(project) {
      const url = slug(project.name).toLowerCase();
      project.url = `${url}-${shortid.generate()}`;
    }
  }
});

module.exports = Projects;