const { DataTypes } = require('sequelize');

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
 
  sequelize.define('categories', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true, //para probar de forma local 
    }
  },
  {timestamps: false}
  );
};
