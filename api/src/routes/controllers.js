const axios = require('axios');
const {Products} = require('../db');

//Traigo la info de la DB

const getDbInfo = async () => {
    try{
        const products = await Products.findAll();
        return products;
    }catch(e){
        console.log(e)
    }
};

module.exports = {
    getDbInfo,
}