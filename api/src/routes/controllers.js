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
        let response = products.map(p =>{
            let categories = p.categories.map(e => e.name)
            return {id: p.id, name: p.name, price: p.price, description: p.description, image: p.image, categories, stock: p.stock, score: p.score_promedio, brand: p.brand.name }
        })
        return response;
        
    }catch(e){
        console.log(e)
    }
};

const getCategoriesDb = async () => {
    try{
        
        let categories = await Categories.findAll({
            attributes: ['name', 'image']
          });
        
        //let namesCategories = categories.map(e =>  e.name);
        
        return categories
    }catch(e){
        console.log(e)
    }
};

const getBrandsDb = async () => {
    try{
        let brands = await Brand.findAll();
        return brands;
    }catch(e){
        console.log(e)
    }   
};

module.exports = {
    getProductsDb,
    getCategoriesDb
}
