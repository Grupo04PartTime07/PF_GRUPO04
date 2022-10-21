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
            allowNull: false
            },

        
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false
            },

        
        },

    {timestamps: false})
}