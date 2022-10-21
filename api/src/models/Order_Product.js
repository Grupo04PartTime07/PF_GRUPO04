const sequelize = require('sequelize')
const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('order_product', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
            },

        
        

        
        },

    {timestamps: false})
}