const Router = require('express')
const router = Router()
const {getWishList, getWishListDetail, modifyWish, createNewWishList} = require('./wishController')

router.get('/', async function(req, res){
    try{
        let result = await getWishList()
        result.length ? res.status(200).send(result) 
        : res.status(404).send('Lista no encontrada') 
    }
    catch(error){
        console.log(error)
    }
})


router.get('/:id', async function(req, res){
    const {id} = req.params
    try{
        const wishDetail = await getWishListDetail(id)
        res.send(wishDetail) 
    }   
    catch(error){
        console.log(error)
    }
})

router.put('/:id', async function(req, res){
    const {id} = req.params
    const {idUsuario, idProd, newStock} = req.body 
    try{
        let modifiedWish = await modifyWish(id, idUsuario, idProd, newStock)
        res.send(modifiedWish)
    }
    catch(error){
        console.log(error)
    }
})

router.post('/', async function(req, res){
    const {user, products} = req.body
    try {
        let result = await createNewWishList(user, products)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router