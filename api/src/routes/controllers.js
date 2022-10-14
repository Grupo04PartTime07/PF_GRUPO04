const axios = require('axios');

//Traigo la info de la API

const getApiInfo = async () => {
    try{
        const { data } = await axios.get('http://localhost:3001/products');
        const products = data.map((e) => {
            return {
                id: e.id,
                name: e.name,
                price: e.price,
                description: e.description,
                image: [e.image],
                category: e.category,
                stock: e.stock,
            }
        });
        return products;
    }catch(e){
        console.log(e)
    }
};

module.exports = {
    getApiInfo,
}