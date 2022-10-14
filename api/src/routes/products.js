const {Router} = require('express')
const {Products} = require('../db')
const router = Router()
const axios = require('axios')
const url_products =  'https://63484f1a0b382d796c6eff8c.mockapi.io/api/productos'


router.get('/', async function(req, res){
    try {
        const {data} = await axios.get(url_products)
        const product = data.map(p => {
            return {
                id: p.id,
                name: p.nombre,
                price: p.precio,
                description: p.descripcion,
                image: [p.imagen], 
                category: p.categoria
            }
        })
        const Model = await Products.bulkCreate(product)
        res.send(Model)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router