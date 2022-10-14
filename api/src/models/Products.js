const sequelize = require('sequelize')
const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Products', 
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
            type: DataTypes.STRING,
            allowNull: false
            },

        description: {
            type: DataTypes.STRING, 
            allowNull: false
            },

        image: {
            type: DataTypes.STRING,
            allowNull: false
            },
        category: {
            type: DataTypes.STRING, 
        }
        },

    {timestamps: false})
}