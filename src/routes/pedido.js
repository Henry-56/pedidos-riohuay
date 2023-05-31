const express  = require("express");
const router=express.Router();

const pedidoController = require('../controllers/pedidosController');
const dniApicontroller = require('../api/consultaDniController');
const { registerUser, loginUser,requireLogin } = require('../middleware/auth');

    

router.get('/pedido',async function(req, res) {
  try {
    res.locals.resultadoConsulta = req.session.resultadoConsulta || null;
     res.render('formdni');

  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/consulta/dni',async function(req, res) {
  try {
     const dni= req.body.dni
     const response = await dniApicontroller.list(dni);
     req.session.resultadoConsulta = response.data;
     console.log(dni)
     console.log(response.data)
     res.redirect(`/pedido`);
  } catch (err) {
    res.status(500).send(err);
  }
});






router.post('/pedidos/add', requireLogin, async function(req, res) {
  try {
    const userId = req.session.user.id_user;
    console.log("id desde la ruta list: " + userId);
    const data = req.body;
    await pedidoController.save(data, userId);

    res.redirect('/productos'); // Redirigir al usuario a la página de productos
  } catch (err) {
    res.status(500).send(err);
  }
});







module.exports=router;