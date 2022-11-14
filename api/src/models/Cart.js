const sequelize = require('sequelize')
const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('cart', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            },

        dataSession: {
            type: DataTypes.STRING,
            allowNull: true
            },

        
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: true
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
              
            //   updatedAt: {
            //     type: "TIMESTAMP",
            //     defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            //     allowNull: true,
            //   },
            
            //  shippingId:{
            //     type:DataTypes.INTEGER,
            //     allowNull: true,
            //     //autoIncrement: true,
            //     //primaryKey: true
            //     default:0
            //  },

            //  stateCarritoId:{
            //     type:DataTypes.INTEGER,
            //     allowNull: true,
            //     //autoIncrement: true,
            //     //primaryKey: true
            //     //default:0
            //  }
    
            },

    {timestamps: false})
}