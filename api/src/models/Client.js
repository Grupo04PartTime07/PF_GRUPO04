const { DataTypes } = require('sequelize');

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
 
  sequelize.define('client', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password:{
        type: DataTypes.STRING,
        allowNull: true,
    },

    dataTarj:{
        type: DataTypes.STRING,
        allowNull: true,
    },

    dataPersonal:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    dataShipping:{
        type: DataTypes.STRING,
        allowNull: true,
    },



  }, {timestamps: false});
};
