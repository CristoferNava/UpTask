const Projects = require('../models/Projects');

exports.home = (req, res) => {
  res.render('home');
};

exports.newProject = (req, res) => {
  res.render('newProject', {
    mainTitle: 'Crear Nuevo Proyecto'
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
    res.render('newProject', {
      errors
    });
  } else {
    const project = await Projects.create({name});
    res.render('newProject', {
      notErrors: 'Proyecto agregado correctamente'
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