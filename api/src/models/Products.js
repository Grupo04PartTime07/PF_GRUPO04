const sequelize = require('sequelize')
const DataTypes = require('sequelize')
const cache = {listProducts: null}
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
            type: DataTypes.INTEGER,
            allowNull: false
            },

        description: {
            type: DataTypes.STRING, 
            allowNull: false
            },

        image: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
            },

        stock: {
            type: DataTypes.INTEGER,
            },

        score_promedio: {
            type: DataTypes.FLOAT
        }

        
        },

    {timestamps: false}),
    cache
}