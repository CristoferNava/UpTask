exports.home = (req, res) => {
  res.render('home');
};

exports.newProject = (req, res) => {
  res.render('newProject', {
    mainTitle: 'Crear Nuevo Proyecto'
  });
};

exports.newProjectSent = (req, res) => {
  res.send("Se envió el formulario");
};