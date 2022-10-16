const axios = require('axios');
const {Products, Categories} = require('../db');
const url_products =  'https://63484f1a0b382d796c6eff8c.mockapi.io/api/productos'

//Traigo la info de la DB

const getDbInfo = async () => {
    try{
        //Esto es solamente provisorio mientras trabajamos con la DB local
        let { data } = await axios.get(url_products)
        const productsList = data.map((e) => {
            return{
                id: e.id,
                name: e.nombre,
                price: e.precio,
                description: e.descripcion,
                image: [e.imagen],
                stock: 0,
            }
        });
        await Products.bulkCreate(productsList, { ignoreDuplicates: true})   //Esto es solamente provisorio mientras trabajamos con la DB local
        const products = await Products.findAll({
            include: {
                model: Categories,
                attribute: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
        return products;
    }catch(e){
        console.log(e)
    }
};

const getCategoriesDb = async () => {
    try{
        //Esto es solamente provisorio mientras trabajamos con la DB local
        await Categories.bulkCreate([
        {name: 'Aceites y Vinagres'},
        {name: 'Agua'},
        {name: 'Almacén'},
        {name: 'Bebidas'},
        {name: 'Cuidado Personal'},
        {name: 'Desayuno y Merienda'},
        {name: 'Especias'},
        {name: 'Golosinas'},
        {name: 'Harinas'},
        {name: 'Lácteos'},
        {name: 'Licores'},
        {name: 'Limpieza'},
        {name: 'Mascotas'},
        {name: 'Pastas Secas'}, 
        {name: 'Perfumeria'},
        {name: 'Reposteria'},
        {name: 'Salsas'},
        {name: 'Secos'},
    ], { ignoreDuplicates: true})
        const categories = await Categories.findAll();
        return categories
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getDbInfo,
    getCategoriesDb
}