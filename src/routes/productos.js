const express  = require("express");
const router=express.Router();

const productosController=require('../controllers/productosController');
const categoriasController=require('../controllers/categoriasController');

const { registerUser, loginUser,requireLogin } = require('../middleware/auth');


const midellwareImg= require('../middleware/productos');


router.get('/productos', async function(req, res) {
  try {
    const productos = await productosController.list();
    const categorias = await categoriasController.list();
    res.render('productos', {
      data: productos,
      categorias: categorias
    });
  } catch (err) {
    res.status(500).send(err);
  }
});







router.get('/', async function(req, res) {
  try {
    res.render('index');
  } catch (err) {
    res.status(500).send(err);
  }
});



router.get('/about', async function(req, res) {
  try {
    res.render('about');
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/contact', async function(req, res) {
  try {
    res.render('contact');
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports=router;