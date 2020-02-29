exports.home = (req, res) => {
  res.render('home');
};

exports.newProject = (req, res) => {
  res.render('newProject', {
    mainTitle: 'Crear Nuevo Proyecto'
  });
};

exports.newProjectSent = (req, res) => {  
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
    res.render('newProject', {
      notErrors: 'Proyecto guardado correctamente'
    });
  }
};