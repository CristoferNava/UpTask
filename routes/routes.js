const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
require('express-validator');
const projectsControllers = require('../controllers/projectsControllers');
const tasksControllers = require('../controllers/tasksControllers');
const usersControllers = require('../controllers/usersControllers');
const authControllers = require('../controllers/authControllers');

module.exports = () => {
  // Main app routes
  router.get('/', 
    authControllers.userAuthenticated,
    projectsControllers.home
  );

  router.get('/new-project', 
    authControllers.userAuthenticated,
    projectsControllers.newProject
  );

  router.post('/new-project',
    authControllers.userAuthenticated,
    body('name').not().isEmpty().trim().escape(),
    projectsControllers.newProjectSent
  );

  // Route for each project
  router.get('/projects/:url',
    authControllers.userAuthenticated, 
    projectsControllers.projectByURL
  );

  // Routes for update the project
  router.get('/project/edit/:id',
    authControllers.userAuthenticated, 
    projectsControllers.editProject
  );

  router.post('/new-project/:id',
    authControllers.userAuthenticated, 
    projectsControllers.updateProject
  );

  // Remove project
  router.delete('/projects/:url', 
    authControllers.userAuthenticated,
    projectsControllers.removeProject
  );

  // Tasks routes
  router.post('/projects/:url', 
    authControllers.userAuthenticated,
    tasksControllers.addTask
  );

  // Update task status
  router.patch('/tasks/:taskID', 
    authControllers.userAuthenticated,
    tasksControllers.changeTaskStatus
  );

  // Remove task
  router.delete('/tasks/:taskID', 
    authControllers.userAuthenticated,
    tasksControllers.removeTask
  );

  // Users
  router.get('/sign-up', usersControllers.showSignUp);
  router.post('/sign-up', usersControllers.createUser);
  router.get('/sign-in', usersControllers.showSignIn);
  router.post('/sign-in', authControllers.authenticateUser);
  router.get('/log-out', authControllers.logOut);

  return router;
};