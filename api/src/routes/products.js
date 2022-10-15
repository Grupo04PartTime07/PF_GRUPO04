const {Router} = require('express')
const {Products, cache} = require('../db')
const router = Router()

const axios = require('axios')
const { getDbInfo } = require('./controllers')
const url_products =  'https://63484f1a0b382d796c6eff8c.mockapi.io/api/productos'


const {getAllProducts} = require('./controller')


router.get('/', async function(req, res){
    let result
    try {
        if(!cache.listProducts){
            
            result = await getAllProducts()
            console.log('from API')
        }
        else{
            result = await Products.findAll()
            console.log('From DB')
        }
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allProducts = await getDbInfo();
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