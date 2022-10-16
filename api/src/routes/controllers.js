const axios = require('axios');
const {Products, Categories, Brand, Promotion} = require('../db');


const getProductsDb = async () => {
    try{
        let products = await Products.findAll({
            include: [
                {
                model: Categories,
                attributes: ["name"],
                through:{
                    attributes: [],
                },
               
            },

            {
                model: Brand,
                attributes: ["name"],              
            },

            {
                model: Promotion,
                attributes: ["option"],              
          
            },
        
        ],

        })
        console.log(products)
        return products;
        
    }catch(e){
        console.log(e)
    }
};

const getCategoriesDb = async () => {
    try{
        
        let categories = await Categories.findAll();
        
        //let namesCategories = categories.map(e =>  e.name);
        
        return categories.map(e =>  e.name);
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getProductsDb,
    getCategoriesDb
}