const sequelize = require('sequelize')
const DataTypes = require('sequelize')
const cache = {listProducts: null}
module.exports = (sequelize) => {
    sequelize.define('products', 
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
            allowNull: true,
            defaultValue: ["https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665888428/bolsa-de-la-compra_p9yqic.png"]
            },

        stock: {
            type: DataTypes.INTEGER,
            },
        
        score_promedio: {
            type: DataTypes.FLOAT,
            }

        },

    {timestamps: false}),
    cache
}
