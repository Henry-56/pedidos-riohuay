const { Carrito } = require('../models/carrito');
const { Productos } = require('../models/productos');





function listCarrito() {
  console.dir(globalCarrito);
  return globalCarrito;
}


function eliminar(id) {
  return Carrito.destroy({
    where: {
      id_carrito: id
    },
  })
};




async function save(req, res) {
  try {
    const productoId = req.cookies.carrito; // Obtener el id del producto desde la cookie "carrito"
    console.log("cooke recibido exitosamente: "+productoId)
    if (!productoId) {
      throw new Error("No se encontró el id del producto en la cookie 'carrito'");
    }

    const producto = await Productos.findByPk(productoId);

    if (!producto) {
      throw new Error("El producto no existe.");
    }

    const [carrito, created] = await Carrito.findOrCreate({
      where: { id_producto: productoId },
      defaults: { cantidad: 1, total: producto.precio }
    });

    if (!created) {
      
      let cantidadTotal=carrito.cantidad++;
      carrito.total += producto.precio*cantidadTotal;
      await carrito.save();
    }
    res.status(200).send(carrito)
    return carrito;
  } catch (err) {
    console.log("Error en carritoController.save: ", err);
    throw err;
  }
}

async function list(req, res) {
  try {
    const carrito = await Carrito.findAll({ include: { model: Productos } });
    console.log(carrito)
    res.status(200).json(carrito);
  } catch (err) {
    console.log("Error en carritoController.list: ", err);
    throw err;
  }
}


async function deleteProduct(req, res) {
  
  const productId = req.params.productoId;
  console.log("el producto id es: "+productId)
  const carrito = await Carrito.findByPk(productId);

  if (!carrito) {
    res.status(404).json({ error: "El producto no está en el carrito" });
    return;
  }

  try {
    await carrito.destroy();
    res.status(200).json({ message: "El producto fue eliminado del carrito" });
  } catch (err) {
    console.log("Error en carritoController.deleteProduct: ", err);
    res.status(500).json({ error: "Ocurrió un error al eliminar el producto del carrito" });
  }
}


module.exports = { 
  save, 
  list,
  deleteProduct
};
