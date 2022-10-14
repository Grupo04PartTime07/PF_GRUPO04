const sequelize = require('sequelize')
const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('products', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
            },

        name: {
            type: DataTypes.STRING,
            allowNull: false
            },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
            },

        description: {
            type: DataTypes.STRING, 
            allowNull: false
            },

        image: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
            },

        stock: {
            type: DataTypes.INTEGER,
            }
        },

    {timestamps: false})
}