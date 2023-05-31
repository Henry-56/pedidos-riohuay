const express  = require("express");
const router=express.Router();

const carritoController=require('../controllers/carritosController');

const { registerUser, loginUser,requireLogin } = require('../middleware/auth');

router.get('/carrito', requireLogin, async function(req, res) {
    try {
      const userId = req.session.user.id_user;
      console.log("id desde la ruta list: "+userId)
      const carrito = await carritoController.list(userId);
      console.log("productos: ", carrito);
      const detalleCarritos = carrito[0].detalle_carritos;
      console.log(detalleCarritos);
      //console.log("total: ", total);
      res.render('carrito', {
        productos: carrito,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  




  router.post('/carrito/add', requireLogin, async function(req, res) {
    try {
      console.log("el req seccion es: "+req.session.user)
      const data = req.body;
      const userId = req.session.user.id_user;
      console.log("id del usuario es: " + userId);
      console.log("la data es: ", data);
      data.id_user = userId;
      data.id_producto = parseInt(data.id_producto); // convierte a entero
      await carritoController.save(data);
      res.redirect('/carrito');
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

  



  router.get('/carrito/delete/:id', requireLogin, async function(req, res) {
    try {
      const id_producto = parseInt(req.params.id);
      const userId = req.session.user.id_user;
      await carritoController.eliminar(id_producto, userId);
      res.redirect('/carrito');
      
    } catch (err) {
      res.status(500).send(err);
    }
  });
  


router.get('/productos/update/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const productos=await productosController.edit(id);
    const categorias = await categoriasController.list();
    res.render('productos_edit',{
      data: productos[0],
      categorias: categorias
  });
  } catch (err) {
    res.status(500).send(err);
  }
});





module.exports=router;