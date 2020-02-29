const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

module.exports = () => {
  router.get('/', controllers.home);
  router.get('/new-project', controllers.newProject);
  router.post('/new-project', controllers.newProjectSent);

  return router;
};