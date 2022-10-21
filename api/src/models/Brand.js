const sequelize = require('sequelize')
const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('brand', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            
            },

        name: {
            type: DataTypes.STRING,
            allowNull: false
            },

        
        image: {
            type: DataTypes.STRING,
            allowNull: true
            },

        
            isDeleted:{
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
          
              },
        
              createdAt: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: true,
              },
              
              /* updatedAt: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
                allowNull: false,
              }, */
         
    
            },

    {timestamps: false})
}