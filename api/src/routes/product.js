const {Router} = require('express')
const {Products} = require('../db')
const router = Router()
/* const axios = require('axios') */

router.get('/products/:id', async function(req, res){
    const {id} = req.params
    try{
        const data = await Products.findByPk(id)
        res.send(data)
    }

    catch(error){
        console.log(error)
    }
})

module.exports = router
