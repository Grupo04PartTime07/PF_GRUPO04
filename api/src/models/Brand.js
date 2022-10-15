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

        
        },

    {timestamps: false})
}