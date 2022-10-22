const { DataTypes, BOOLEAN } = require('sequelize');

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
    },

    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false

  },

  dataTarj:{
    type: DataTypes.STRING,
    allowNull: true,
},

dataPersonal:{
    type: DataTypes.STRING,
    allowNull: true,
},

    isDeleted:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false

    },

    isBanned:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false

    },
    
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: true,
    },
    
  },{timestamps: false});
};
