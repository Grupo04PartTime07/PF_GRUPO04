const axios = require('axios');
const {Products, Categories, Brand, Promotion, Score} = require('../db');


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

const createProduct = async (name, price, description, image,stock, score, categories, brand) => {
    try {
        var newProduct = await Products.create({
                name: name,
                price: price, 
                description: description,
                image: [image],
                stock: stock,
                score_promedio: score,
        });

        const brands = await Brand.findOne({
            where: {
                name: brand,
            }
        });

        if(!brands){
            await Brand.create({
                name: brand
            })
        };

        for(c of categories){
            category = await Categories.findOne({
                where: {
                    name: c
                }
            })
            newProduct.addCategories(category.id);
        }
        
        newProduct.setBrand(brands);

        return newProduct
    } catch (error) {
        console.log(error)
    }
};

const createCategory = async (name, image) => {
    try{
        var newCategory = await Categories.create({
            name: name,
            image: image,
        });

        return newCategory
    }catch(e){
        console.log(e)
    }
}

const getProductDetail = async (id) => {
    try{
        let product = await Products.findByPk(id, {
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
            {
                model: Score,
                attributes: ["score", "coment", "id"],
            }
        
        ],

        })
       
            let categories = product.categories.map(e => e.name)
            let response = {id: product.id, name: product.name, price: product.price, description: product.description, image: product.image, categories, stock: product.stock, score: product.score_promedio, brand: product.brand.name, opiniones: product.scores }
    
        return response;
        
    }catch(e){
        console.log(e)
    }
};

const updateProduct = async (id, props) => {

    try {
        await Products.update(
            {
             name: props.name,
             price: props.price,
             description: props.description,
             image: [...props.image]
            }, {
                where: {
                    id: id
                }
            })

        let productModified = await Products.findByPk(id)
        return productModified
    } catch(e) {
        console.log(e)
    }
};

module.exports = {
    getProductsDb,
    getCategoriesDb,
    getBrandsDb,
    createProduct,
    createCategory,
    getProductDetail,
    updateProduct
}
