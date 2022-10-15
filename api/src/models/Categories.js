const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('categories', {
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
