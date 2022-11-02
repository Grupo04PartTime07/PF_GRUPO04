const sequelize = require('sequelize')
const DataTypes = require('sequelize')

//Marcas

module.exports = (sequelize) => {
    sequelize.define('promotion',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },

            option: {
                type: DataTypes.STRING,
                allowNull: false
            },

            value: {
                type: DataTypes.INTEGER,
                allowNull: true
            },


            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false

            },

            createdAt: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: true,
            },



        }, { timestamps: false })
}