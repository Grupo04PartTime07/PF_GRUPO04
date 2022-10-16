const axios = require('axios');
const {Products, Categories, Brand} = require('../db');


const getDbInfo = async () => {
    try{
        let products = await Products.findAll({
            include: {
                model: Categories,
                attributes: ["name"],
                through:{
                    attributes: [],
                },
                Brand
            }
        }
        )
        
        return products;
    }catch(e){
        console.log(e)
    }
};

const getCategoriesDb = async () => {
    try{
        
        let categories = await Categories.findAll();
        
        return categories
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getDbInfo,
    getCategoriesDb
}