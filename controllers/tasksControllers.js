const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.addTask = async (req, res, next) => {
  // Get the project by the URL
  const project = await Projects.findOne({where: {url: req.params.url}});
  
  // Create the task
  // state == 0 for incomplete task (checked)
  const ProjectId = project.id; // ProjectId has to be the same name that the Foreign key define in the table
  const {task} = req.body;
  const state = 0;
  const result = await Tasks.create({task, state, ProjectId})

  // Check the result of the query
  if (!result) {
    return next();
  }

  // Reload the page if everything is ok
  res.redirect(`/projects/${req.params.url}`);
};

exports.changeTaskStatus = (req, res) => {
  res.send('Todo bien desde el backend!');
} 