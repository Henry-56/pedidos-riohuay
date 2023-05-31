const bcrypt = require('bcrypt');
const { User } = require('../models/user');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).send('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    if (!user) {
      throw new Error('El usuario no se creó correctamente');
    }
    
    req.session.user = { id_user: user.id_user, name, email };
    res.redirect('/login');
    //res.json({ message: 'Inicio de sesión exitoso.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('El correo electrónico o la contraseña son incorrectos');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('El correo electrónico o la contraseña son incorrectos');
    }

    req.session.user = { id_user: user.id_user, name: user.name, email };
    req.session.isLoggedIn = true;
    console.log('isLoggedIn establecido a true');
    console.log(req.session);
    res.redirect('/productos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};


exports.requireLogin = async (req, res, next) => {
  console.log(req.session);
  
  if (req.session.isLoggedIn) {
    // Si el usuario ha iniciado sesión, continuar con la siguiente ruta o middleware
    console.log('middleware requireLogin ejecutado');
    next();
  } else {
    // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    res.redirect('/login');
  }
};


