const DataTypes = require("sequelize");

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
  sequelize.define(
    "shipping",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      calle: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      nro: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
