const sequelize = require("sequelize");
const DataTypes = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'shipping_cart',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },

      datosEnvio: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      calle: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      nro: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      total: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },

    { timestamps: false }
  );
};
