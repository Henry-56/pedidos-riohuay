const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const PedidoEnProceso = sequelize.define("pedidosenprocesos", {
  id_pedidosEnProceso: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  id_pedido: {
    type: Sequelize.INTEGER,
    allowNull: true
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



PedidoEnProceso.sync()
  .then(() => console.log("Sequelize models initialized"))
  .catch(err => console.error("Error while initializing models: ", err));

module.exports = {
  PedidoEnProceso
};
