const DataTypes = require('sequelize');

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
 
  sequelize.define(
    'stateCarrito',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );
};
