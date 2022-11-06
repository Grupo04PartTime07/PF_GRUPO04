const {Orden, UserRegisted, Cart, StateOrden, Products} = require('../db')

const getOrders = async() => {
    try{
        let orders = await Orden.findAll({
            where: { isDeleted: false },
            include: [
                {
                model: StateOrden,
                attributes: ['state'],
            },
            {
                model: Cart,
                attributes: ['userRegistedId'],
            }]
        })

        let ordersFinal = []
        
        for(const e of orders){
            let user = await UserRegisted.findOne({
                where: {
                    id: e.cart.userRegistedId ? e.cart.userRegistedId : ' '
                }
            });

            if(!user){
                var userEmail = 'enzo@gmail.com'
            }else{
                var userEmail = user.email;
            }
            
            ordersFinal.push({
                
                    id: e.id ? e.id : 'id',
                    isDeleted: e.isDeleted,
                    createdAt: e.createdAt ? e.createdAt : 'createdAt ',
                    datosEnvio: e.datosEnvio ? e.datosEnvio : 'datosEnvio',
                    total: e.total ? e.total : 'total',
                    estado: e.estado ? e.estado : 'estado',
                    shippingId: e.shippingId ? e.shippingId : 'shippingId',
                    cartId: e.cartId ? e.cartId : 'cartId',
                    stateOrden: e.stateOrden.state ? e.stateOrden.state : 'state',
                    userEmail: userEmail ? userEmail : 'enzo@gmail.com'
            })
        };
        return ordersFinal
    }
    catch(error){
        console.log(error)
    }
}

const getOrdersByUser = async(email) => {
    try{
        const user = await UserRegisted.findOne({
            where: {
                email: email
            }
        })

        let orders = await Orden.findAll({
            where: { isDeleted: false },
            include: [
                {
                model: StateOrden,
                attributes: ['state'],
            },
            {
                model: Cart,
                attributes: ['id'],
                where: {
                    userRegistedId: user.id
                }
            }]
        })

        let ordersFinal = orders.map((e) => {
            return {
                    id: e.id ? e.id : 'id',
                    isDeleted: e.isDeleted,
                    createdAt: e.createdAt ? e.createdAt : 'createdAt ',
                    datosEnvio: e.datosEnvio ? e.datosEnvio : 'datosEnvio',
                    total: e.total ? e.total : 'total',
                    estado: e.estado ? e.estado : 'estado',
                    shippingId: e.shippingId ? e.shippingId : 'shippingId',
                    cartId: e.cartId ? e.cartId : 'cartId',
                    stateOrden: e.stateOrden.state ? e.stateOrden.state : 'state',
            }
        })

        return ordersFinal

    }
    catch(error){
        console.log(error)
    }
}

const getOrderbyId = async(id) => {
    try {
        const order = await Orden.findByPk(id);
        const idCart = order.cartId;

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
                image: el.image[0],
                id: el.id,
                quantity: el.cart_product.cantidad
            }
            Factura.productos.push(obj)
        })
    
        return Factura
    } catch (error) {
        console.log(e)
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

const deleteOrder = async (id) => {
    try{
        let order = await Orden.findByPk(id)
        if(order.isDeleted === true){
            return 'La orden no fue encontrada'
        }
        else{
            await Orden.update({
                isDeleted: true
            },
            {
                where:{
                    id: id
            }
        })
    return 'La Orden fue Borrada exitosamente'
        }
    }
    catch(error){
        console.log(error)
    }
}


module.exports = {
    getOrders,
    getOrderbyId,
    modifyStatusOrder,
    createNewOrder,
    getOrdersByUser,
    deleteOrder
}