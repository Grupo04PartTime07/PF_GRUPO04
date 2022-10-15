const {Products, cache} = require('../db')
const axios = require('axios')
const url_products =  'https://63484f1a0b382d796c6eff8c.mockapi.io/api/productos'

const getAllProducts = async function(){
    let {data} = await axios.get(url_products)
    const productsList = data.map(p => {
        return {
            id: p.id,
                name: p.nombre,
                price: p.precio,
                description: p.descripcion,
                image: [p.imagen], 
                stock: 0
        }
    })

    await Products.bulkCreate(productsList, {ignoreDuplicates: true})
    const List = await Products.findAll()
    cache.listProducts = List
    return List
}

module.exports = {
    getAllProducts
}