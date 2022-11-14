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
    image: {
      type: DataTypes.STRING,
      allowNull: true, //para probar de forma local 
    },


   isDeleted:{
    type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
      
          },

          createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: true,
          },
    

     

        },
  {timestamps: false}
  );
};
