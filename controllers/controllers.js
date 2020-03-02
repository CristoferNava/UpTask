const Projects = require('../models/Projects');

exports.home = async (req, res) => {
  const projects = await Projects.findAll();
  res.render('home', {
    projects
  });
};

exports.newProject = async (req, res) => {
  const projects = await Projects.findAll();
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
    const projects = await Projects.findAll();
    res.render('newProject', {
      errors,
      projects
    });
  } else {
    // const url = slug(name).toLowerCase();
    const project = await Projects.create({name});
    const projects = await Projects.findAll();
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
  const project = await Projects.findOne({
    where: {
      url: req.params.url
    }
  });
  
  if (!project) return next(); // Pasar al siguiente middleware
  res.send('Se encontró el proyecto');
};