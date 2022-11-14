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
    const {idUsuario} = req.body
    const {idProd} = req.body
    try{
        await modifyWish(id, idUsuario, idProd)
        res.status(200).json('La lista de favoritas fue modificada con éxito!')
    }
    catch(error){
        console.log(error)
    }
})

router.post('/', async function(req, res){
    const {userEmail, cart} = req.body
    try {
        await createNewWishList(userEmail, cart)
        res.status(200).json('La lista de favoritos fue creada con éxito!')
    } catch (error) {
        console.log(error)
    }
})
module.exports = router