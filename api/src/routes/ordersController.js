const {Orden, UserRegisted, Cart, StateOrden, Products} = require('../db')

const getOrders = async() => {
    try{
        let orders = await Orden.findAll({
            where: { isDeleted: false },
        }, {
            include: {
                model: StateOrden,
                attributes: ['name']
            }
        })
        return orders
    }
    catch(error){
        console.log(error)
    }
}

const getOrdersByUser = async(email) => {
    try{
        const User = await UserRegisted.findOne({
            where: {
                email: email
            }
        }, {
            include: {
                model: Cart
            }
        })

        const idCart = User.cartId

        const Orders = await Orden.findAll({
            where: { cartId : idCart },
            attributes: ["id", "total", "createdAt", "estado" ]
        })
        return Orders

    }
    catch(Error){
        console.log(Error)
    }
}

const getOrderbyId = async(id) => {
    try {
        const order = await Orden.findByPk(id)
        const idCart = order.cartId

        const Carts = await Cart.findByPk(idCart, 
            {
                include: {
                    model: Products,
                    attributes: ["id", "name", "price", "image"],
                }
            })
            
        let Factura = {
            idOrder: order.id,
            date: order.createdAt,
            total: order.total,
            estado: order.estado,
            productos: []
        }

        Carts.dataValues.products.map(el => {
            let obj = {
                name: el.name,
                price: el.price,
                image: el.image[0][0],
                id: el.id,
                quantity: el.cart_product.cantidad
            }
            Factura.productos.push(obj)
        })
    
        return Factura
    } catch (error) {
        
    }
}

const modifyStatusOrder = async (id, status) => {
    console.log(status)
    try{

        let order = await Orden.findOne({
            where: {
                id: id,
            }
        })

        let newStateOrder = await StateOrden.findOne({ 
            where:{
                state: status
            }
        })

        let newStateOrderId = newStateOrder.id

        await order.setStateOrden(newStateOrderId)
       
        let orderModified = await Orden.findByPk(id, {
            include: {
                model: StateOrden
            }
        })
        return orderModified
    }

    catch(error){
        console.log(error)
    }
}

const createNewOrder = async (datosEnvio, total, estado, /* shippingId */ cartId) => {
    try {
        const stateOrden = await StateOrden.findOne({where: {state: estado}})
        const stateOrdenId = stateOrden.id

        const newOrder = Orden.create({
            datosEnvio,
            total,
            estado,
            /* shippingId */
            cartId,
            stateOrdenId
        })

        return newOrder

    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getOrders,
    getOrderbyId,
    modifyStatusOrder,
    createNewOrder,
    getOrdersByUser
}