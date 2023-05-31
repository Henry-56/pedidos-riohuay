const Sequelize = require('sequelize');
const sequelize = require('../db/config');


const DetalleCarrito = sequelize.define("detalle_carritos", {
  id_detalle_carrito: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_carrito : {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  id_producto: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
});


DetalleCarrito.sync()
  .then(() => console.log("Sequelize models initialized"))
  .catch(err => console.error("Error while initializing models: ", err));

module.exports = {
  DetalleCarrito
};
