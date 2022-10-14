const {Router} = require('express')
const {Products} = require('../db')
const router = Router()
const axios = require('axios')
const { getApiInfo } = require('./controllers')
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
                stock: 0
            }
        })
        const Model = await Products.bulkCreate(product)
        res.send(Model)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allProducts = await getApiInfo();
    try{
        if(id){
            const productId = allProducts.filter((e) => e.id == id);
            productId ? res.status(200).send(productId) : res.status(400).send('El producto no fue encontrado')
        }
    }catch(e){
        console.log(e)
    }
});

module.exports = router