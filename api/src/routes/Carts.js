const e = require('express');
const Router = require('express');
const { card } = require('mercadopago');
const router = Router()
const { Cart, UserRegisted, Products, StateCarrito } = require('../db');

router.post('/', async function(req, res){

    const { idCart, cart, subtotal, email} = req.body
    const carrito = await Cart.findByPk(idCart);

    const user = await UserRegisted.findOne({
        where: {
          email: email,
        }
    });

    try{
        if(!carrito){
            const cartCreated = await Cart.create({
                subtotal
            });
            
            cart.map(async (e) => {
                await cartCreated.addProducts(e.id,
                  {
                    through: {
                      precio: e.unit_price,
                      cantidad: e.quantity
                    }
                  })
            });

            await cartCreated.setStateCarrito(4);

            await user.addCart(cartCreated.id);


        }else{
            await Cart.update({
                subtotal
              }, {
                where: {
                  id: idCart
                }
            });

            await carrito.setProducts([]);

            cart.map(async (e) => {
                await carrito.addProducts(e.id,
                  {
                    through: {
                      precio: e.unit_price,
                      cantidad: e.quantity
                    }
                  })
            });

            await carrito.setStateCarrito(4);

            await user.addCart(carrito.id)


        }
    }catch(e){
        console.log(e)
    }

    res.status(200).json('El carrito fue creado con exito!');
})


module.exports = router