const {Router} = require('express')
const router = Router()
const {getOrders, getOrderbyId, modifyStatusOrder, createNewOrder, getOrdersByUser} = require('./ordersController')

router.get('/', async function(req, res){
    
    try{
        const {id, status, email} = req.query
        let orders = await  getOrders()

        if(id){
            let orderById = await getOrderbyId(id)
            orderById ? res.status(200).send(orderById) 
            : res.status(400).send('order not found')
            return 
        }

        if(status){
            let orderByStatus = orders.filter(e => e.status.includes(status))
            orderByStatus.length ? res.status(200).send(orderByStatus) 
            : res.status(400).send('order not found') 
            return 
        }

        if(email){
            let Users = await getOrdersByUser(email)
            res.send(Users)
        }
        else{
            res.status(200).send(orders)
        }

    }
    catch(error){
        console.log(error)
    }
})


router.put('/', async function(req, res){
    try {
        const {id, estado} = req.body
        let orderModified = await modifyStatusOrder(id, estado)
        res.status(200).send(orderModified)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async function(req, res){
    const {datosEnvio, total, estado, /* shippingId */ cartId } = req.body
    try {

        const newOrder = await createNewOrder(
            datosEnvio,
            total,
            estado,
            /* shippingId */
            cartId
        )
    res.send(newOrder)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router
