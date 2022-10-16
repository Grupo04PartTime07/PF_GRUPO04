const { DataTypes } = require('sequelize');

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
 
  sequelize.define('userRegisted', {
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
    }
    
  },{timestamps: false});
};
