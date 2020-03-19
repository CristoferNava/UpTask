const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const projectsControllers = require('../controllers/projectsControllers');
const tasksControllers = require('../controllers/tasksControllers');
const usersControllers = require('../controllers/usersControllers');

module.exports = () => {
  // Main app routes
  router.get('/', projectsControllers.home);
  router.get('/new-project', projectsControllers.newProject);
  router.post('/new-project',
    body('name').not().isEmpty().trim().escape(),
    projectsControllers.newProjectSent
  );

  // Route for each project
  router.get('/projects/:url', projectsControllers.projectByURL);

  // Routes for update the project
  router.get('/project/edit/:id', projectsControllers.editProject);
  router.post('/new-project/:id', projectsControllers.updateProject);

  // Remove project
  router.delete('/projects/:url', projectsControllers.removeProject);

  // Tasks routes
  router.post('/projects/:url', tasksControllers.addTask);

  // Update task status
  router.patch('/tasks/:taskID', tasksControllers.changeTaskStatus);

  // Remove task
  router.delete('/tasks/:taskID', tasksControllers.removeTask);

  // Users
  router.get('/sign-up', usersControllers.showSignUp);
  router.post('/sign-up', usersControllers.createUser);

  return router;
};