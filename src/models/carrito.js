const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Carrito = sequelize.define("carritos", {
  id_carrito: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
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



Carrito.sync()
  .then(() => console.log("Sequelize models initialized"))
  .catch(err => console.error("Error while initializing models: ", err));

module.exports = {
  Carrito
};
