const Sequelize = require('sequelize');
const sequelize=require('../db/config');



const User = sequelize.define("users", {
    id_user: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

// Establecer relación



User.sync()
.then(() => console.log("Sequelize models initialized"))
.catch(err => console.error("Error while initializing models: ", err));



module.exports = {
    User
};