const e = require('express');
const Router = require('express');
const { card } = require('mercadopago');
const router = Router()
const { Cart, UserRegisted, Products, StateCarrito } = require('../db');

router.post('/', async function(req, res){
    const {idCart, user, products} = req.body

        let subtotal = 0
        for(let i = 1; i < products.length; i++ ){
            subtotal = subtotal + products[i].unit_price * products[i].quantity
        }

        let cart = await Cart.findByPk(idCart, {
            include: {
                model: Products
            }
        })

        let usuario = await UserRegisted.findOne({
            where: {email: user}
        })

        if(!cart){
            let newCart = await Cart.create({
                subtotal, 
                isDeleted: false
            })

            await products.map(prod => {
                newCart.addProducts(prod.id, {
                    through: {
                        precio: prod.unit_price,
                        cantidad: prod.quantity,
                        isDeleted: false
                    }
                })
            })

            await newCart.setStateCarrito(1)
        
            await UserRegisted.update({
                cartId: newCart.id, 
                }, {
                where: {
                    id: usuario.id
                }
            })
            
            const CartCreated = await Cart.findByPk(newCart.id, {
                include: [
                    {model: UserRegisted},
                    {model: Products}
                ]
            })
            res.send(CartCreated)
        }
        else{
            await Cart.update({
                subtotal
            }, {
                where: {
                    id: cart.id
                }
            })
        }

        await cart.setProducts([])

        await products.map(prod => {
            cart.addProducts(prod.id, {
                through: {
                    precio: prod.unit_price,
                    cantidad: prod.quantity,
                    isDeleted: false
                }
            })
        })

        await cart.setStatusCarrito(1)

        let cartUpdated = await Cart.findByPk(cart.id, {
            include: [
                {model: UserRegisted},
                {model: Products}
            ]
        })
        res.send(cartUpdated)
})


module.exports = router