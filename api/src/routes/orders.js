const {Router} = require('express')
const router = Router()
const {getOrders, getOrderbyId, modifyStatusOrder, getOrdersByUser, deleteOrder, allPurchases} = require('./ordersController')

router.get('/', async function(req, res){
    
    try{
        const {id, status, email} = req.query

        if(id){
            let orderById = await getOrderbyId(id)
            orderById ? res.status(200).send(orderById) 
            : res.status(400).json('La orden no fue encontrada')
            return 
        }

        if(status){
            let orders = await getOrders()
            let orderByStatus = orders.filter(e => e.status.includes(status))
            orderByStatus.length ? res.status(200).send(orderByStatus) 
            : res.status(400).json('La orden no fue encontrada') 
            return 
        }

        if(email){
            let Users = await getOrdersByUser(email)
            res.json(Users)
        }
        else{
            let orders = await getOrders()
            res.status(200).json(orders)
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
        res.status(200).json(orderModified.estado === "Completada"? "Muchas gracias por confirmar la recepcion de su compra" : orderModified.estado === "Cancelada"? "Su compra ha sido Cancelada" : "La orden ha sido actualizada" )

    } catch (error) {
        res.json({error: error.messagge})
    }
})

router.delete('/', async function(req, res){
    const {id} = req.query
    try{
        let Deleted = await deleteOrder(id)
        res.status(200).json(Deleted)
    }
    catch(error){
        console.log(error)
    }
})

router.get('/user', async (req, res)=>{
    try {
        const { email } = req.query;
        const response = await allPurchases(email)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
