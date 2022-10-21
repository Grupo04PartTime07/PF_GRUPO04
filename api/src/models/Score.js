const sequelize = require('sequelize')
const DataTypes = require('sequelize')

//Puntuacion

module.exports = (sequelize) => {
    sequelize.define('score', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
            },

        score: {
            type: DataTypes.INTEGER,
            allowNull: false
            },

        coment:{
            type: DataTypes.STRING,
            allowNull: true
            },
        
        },
        
    

     

    {timestamps: false})
}