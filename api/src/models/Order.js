const sequelize = require('sequelize')
const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('order', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            },

        total: {
            type: DataTypes.INTEGER,
            allowNull: false
            },

        
        dataSession: {
            type: DataTypes.STRING,
            allowNull: false
            },

        dataShipping: {
            type: DataTypes.STRING,
            allowNull: false
            },
        
        status:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
        },

    {timestamps: false})
}