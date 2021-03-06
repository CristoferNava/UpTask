const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.home = async (req, res) => {
  const UserId = res.locals.user.id;
  const projects = await Projects.findAll({where: {UserId}});
  res.render('home', {
    mainTitle: 'Proyectos',
    projects
  });
};

exports.newProject = async (req, res) => {
  const UserId = res.locals.user.id;
  const projects = await Projects.findAll({where: {UserId}});
  res.render('newProject', {
    mainTitle: 'Crear Nuevo Proyecto',
    projects
  });
};

exports.newProjectSent = async (req, res) => {  
  // Form validation
  const {name} = req.body;
  const errors = [];

  if (!name) {
    errors.push({message: 'Debes agregar un nombre al proyecto'});
  }

  if (errors.length) {
    const UserId = res.locals.user.id;
    const projects = await Projects.findAll({where: {UserId}});
    res.render('newProject', {
      errors,
      projects
    });
  } else {
    // const url = slug(name).toLowerCase();
    // agregamos el proyecto a la base de datos
    const UserId = res.locals.user.id;
    await Projects.create({name, UserId});
    const projects = await Projects.findAll({where: {UserId}});
    res.render('newProject', {
      notErrors: 'Proyecto agregado correctamente',
      projects
    });

    // Projects.create({name})
    //   .then(() => {
    //     res.render('newProject', {
    //       notErrors: 'Proyecto guardado correctamente'
    //     });
    //   })
    //   .catch(() => {
    //     res.render('newProject', {
    //       notErrors: 'Favor de enviar el proyecto de nuevo'
    //     });
    //   });
  }
};

exports.projectByURL = async (req, res, next) => {
  const UserId = res.locals.user.id;
  const projectsPromise = Projects.findAll({where: {UserId}});
  const projectPromise = Projects.findOne({
    where: {
      url: req.params.url,
      UserId
    }
  });
  
  const [projects, project] = await Promise.all([projectsPromise, projectPromise])
  if (!project) return next(); // Pasar al siguiente middleware

  // Get the data of the tasks
  const tasks = await Tasks.findAll({where: {ProjectId: project.id}});
  
  // Renderizando la vista
  res.render('projectTasks', {
    mainTitle: project.name,
    projects,
    project,
    tasks
  });
};

exports.editProject = async (req, res) => {
  const UserId = res.locals.user.id;
  const projectsPromise = Projects.findAll({where: {UserId}});
  const projectPromise = Projects.findOne({
    where: {
      id: req.params.id, 
      UserId // evita el acceso a urls privadas
    }
  });
  // Puesto que las consultas son independientes es más optimo usar un sólo await
  const [projects, project] = await Promise.all([projectsPromise, projectPromise]);
  if (!project) return next();

  res.render('newProject', {
    mainTitle: 'Editar Proyecto',
    projects,
    project
  });
};

exports.updateProject = async (req, res) => {
  // Form validation
  const {name} = req.body;
  const errors = [];

  if (!name) {
    errors.push({message: 'Debes agregar un nombre al proyecto'});
  }

  if (errors.length) {
    const UserId = res.locals.user.id;
    const projects = await Projects.findAll({where: {UserId}});
    res.render('newProject', {
      errors,
      projects
    });
  } else {
    // const url = slug(name).toLowerCase();
    await Projects.update(
      {name: name},
      {where: {id: req.params.id}});

    const UserId = res.locals.user.id;
    const projects = await Projects.findAll({where: {UserId}});
    res.render('newProject', {
      notErrors: 'Proyecto actualizado correctamente',
      projects
    });
  }
};

exports.removeProject = async (req, res, next) => {
  const {projectURL} = req.query;
  const result = await Projects.destroy({where: {url: projectURL}});

  if (!result) {
    return next(); // No mandamos el mensaje status correcto
  }

  res.status(200).send('Mensaje de prueba');
};