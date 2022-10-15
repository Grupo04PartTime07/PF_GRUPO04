const {Router} = require('express')
const {Products, cache} = require('../db')
const router = Router()
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

module.exports = router