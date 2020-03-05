const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const controllers = require('../controllers/controllers');

module.exports = () => {
  // Main app routes
  router.get('/', controllers.home);
  router.get('/new-project', controllers.newProject);
  router.post('/new-project',
    body('name').not().isEmpty().trim().escape(),
    controllers.newProjectSent
  );

  // Route for each project
  router.get('/projects/:url', controllers.projectByURL);

  // Routes for update the project
  router.get('/project/edit/:id', controllers.editProject);
  router.post('/new-project/:id', controllers.updateProject);

  // Remove project
  router.delete('/projects/:url', controllers.removeProject);

  return router;
};