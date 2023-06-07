
const sequelize = require('../db/config');
const { Productos,Carrito,DetalleCarrito } = require('../models/index');

async function list(userId) {
  return Carrito.findAll({
    where: { id_user: userId },
    include: { 
      model: DetalleCarrito, 
      required: true,
      include: { model: Productos, required: true }
    }
  });
};

  

async function save(data) {
  try {
    console.log('Data recibida:', data);
    
    const [carrito, created] = await Carrito.findOrCreate({
      where: { id_user: data.id_user },
      defaults: {
        cantidad: 0,
        total: 0,
      },
    });
    
    const producto = await Productos.findByPk(data.id_producto);
    console.log('Producto encontrado:', producto);
    
    // Buscar si el producto ya está en el carrito
    const detalleCarrito = await DetalleCarrito.findOne({
      where: { id_carrito: carrito.id_carrito, id_producto: producto.id }
    });
    
    if (detalleCarrito) {
      // Actualizar cantidad y total del producto existente
      detalleCarrito.cantidad += parseInt(data.cantidad);
      detalleCarrito.total += data.cantidad * producto.precio;
      await detalleCarrito.save();
    } else {
      // Crear nuevo registro de DetalleCarrito
      await DetalleCarrito.create({
        id_carrito: carrito.id_carrito,
        id_producto: producto.id,
        cantidad: data.cantidad,
        total: data.cantidad * producto.precio,
      });
    }
    
    // Actualizar cantidad y total del carrito
    carrito.cantidad += parseInt(data.cantidad);
    carrito.total += data.cantidad * producto.precio;
    await carrito.save();

    // Actualizar cantidad en la tabla Productos
    producto.cantidad -= parseInt(data.cantidad);
    await producto.save();  
    
    return carrito;
  } catch (error) {
    console.error(error);
    throw new Error("Error while saving to database");
  }
}


  

async function eliminar(id_producto, userId) {
  try {
    const carrito = await Carrito.findOne({
      where: { id_user: userId }
    });
    
    if (carrito) {
      await DetalleCarrito.destroy({
        where: {
          id_carrito: carrito.id_carrito,
          id_producto: id_producto
        }
      });
    } else {
      throw new Error("No se encontró el carrito para el usuario especificado.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el producto del carrito.");
  }
}



  
  
  






module.exports={
    list,
    save,
    eliminar,

    
}