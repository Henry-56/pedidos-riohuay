const { PedidoEnProceso, Pedido, Carrito, DetalleCarrito } = require('../models/index');


async function save(data, userId) {
  // Buscar el carrito del usuario
  const carrito = await Carrito.findOne({ where: { id_user: userId } });

  // Buscar los detalles del carrito
  const detallesCarrito = await DetalleCarrito.findAll({ where: { id_carrito: carrito.id_carrito } });

  // Calcular el total del pedido
  const total = detallesCarrito.reduce((acc, cur) => acc + cur.total, 0);

  // Crear el pedido
  const pedido = await Pedido.create({
    id_user: userId,
    id_carrito: carrito.id_carrito,
    direccion: data.direccion,
    telefono: data.telefono,
    total: total,
    estado: "pendiente"
  });

  // Crear el registro en PedidoEnProceso
  const pedidoEnProceso = await PedidoEnProceso.create({
    id_pedidosEnProceso: carrito.id_carrito,
    id_user: userId,
    id_pedido: pedido.id_pedido,
    createdAt: carrito.createdAt,
    updatedAt: carrito.updatedAt
  });

  // Actualizar el id_pedido_en_carrito en DetalleCarrito
  await DetalleCarrito.update(
    { id_carrito: pedidoEnProceso.id_pedidosEnProceso },
    { where: { id_carrito: carrito.id_carrito } }
  );

  // Eliminar el carrito y los detalles del carrito
  await carrito.destroy();


  return pedido;
}





module.exports={

    save,

    
}