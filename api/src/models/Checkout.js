
const { DataTypes } = require('sequelize');

// Pensar si poner otra clase mas de las opciones 1 a 1 con categories

module.exports = (sequelize) => {
 
  sequelize.define('checkout', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    
    state:{
        type: DataTypes.STRING,
        allowNull: true
        },

    payment_id:{
        type: DataTypes.STRING,
        allowNull: true
        
        
    },

    status:{
        type: DataTypes.STRING,
        allowNull: true
    } ,


    payment_type:{
        type: DataTypes.STRING,
        allowNull: true
    },

    merchant_order_id:{
        type: DataTypes.STRING,
        allowNull: true
    }

       
    
  },{timestamps: true});
};
