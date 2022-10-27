const sequelize = require("sequelize");
const DataTypes = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'orden',
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

      

      total: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },


      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    { timestamps: false }
  );
};
