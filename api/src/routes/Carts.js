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


router.get('/', async function(req, res){
    try{
        const {email} = req.query
        let result = await Cart.findAll({
            include:[
            {
                model: StateCarrito,
                attributes: ['state']
            },
            {
                model: UserRegisted, 
                attributes: ["id", "email", "isAdmin"]
            }, 
            {
                model: Products, 
                attributes: ["id", "name", "price", "description"]
            }]
        })

        if(email){

          let cartsEmail = []

          result.map(el => {
            if(el.userRegisted !== null && el.userRegisted.email.includes(email)){
              cartsEmail.push(el)
            }
          })

          cartsEmail.sort((a,b) => {
            if( a.createdAt <  b.createdAt) return -1
            else if(a.createdAt > b.createdAt) return 1
            else return 0
          })

        let cartProducts = cartsEmail[0].products

        let productsClean = cartProducts.map((e) => {
            return {
                id: e.id,
                name: e.name,
                price: e.price,
                description: e.description
            }
        })

        let lastCart = {
          id: cartsEmail[0].id,
          subtotal: cartsEmail[0].subtotal,
          stateCarrito: cartsEmail[0].stateCarrito.state,
          userRegistedId: cartsEmail[0].userRegistedId,
          userRegisted: cartsEmail[0].userRegisted.email,
          products: productsClean
      }

        res.status(200).send(lastCart)
        }

        else{
          res.send(result)
        }
       
    }
    catch(error){
        console.log(error)
    }
})


module.exports = router