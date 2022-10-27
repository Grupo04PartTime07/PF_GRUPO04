const { DataTypes, BOOLEAN } = require('sequelize');

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
 
  sequelize.define('wishList', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    
    
    
    
  },{timestamps: true});
};
