const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const controllers = require('../controllers/controllers');

module.exports = () => {
  router.get('/', controllers.home);
  router.get('/new-project', controllers.newProject);
  router.post('/new-project',
    body('name').not().isEmpty().trim().escape(),
    controllers.newProjectSent);

  return router;
};