const {Router, application} = require('express')
const router = Router()
const { Cart, UserRegisted, Products, Orden, StateOrden, StateCarrito } = require('../db');


//SDK de MercadPago
const mercadopago = require('mercadopago');

//Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-8763003876428984-102015-2626c522c3a666ad57ca4f935dabf886-1221748734'
});

router.post('/', async (req, res) => {

  const { idCart, cart, subtotal, email, direccion } = req.body
  const carrito = await Cart.findByPk(idCart);

  const user = await UserRegisted.findOne({
    where: {
      email: email,
    }
  });

  try {
    if (!carrito) {
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

      const order = await Orden.findOne({
        where: {
          cartId: cartCreated.id,
        }
      });

      if (!order) {
        const newOrder = await Orden.create({
          total: subtotal,
          datosEnvio: direccion,
        });

        await newOrder.setCart(cartCreated.id);

        await newOrder.setStateOrden(4);
      }

    } else {
      await Cart.update({
        subtotal
      }, {
        where: {
          id: idCart
        }
      })

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

      const order = await Orden.findOne({
        where: {
          cartId: idCart,
        }
      });

      if (!order) {
        const newOrder = await Orden.create({
          total: subtotal,
          datosEnvio: direccion,
        });

        await newOrder.setCart(carrito.id)

        await newOrder.setStateOrden(4);
      }

    };

}catch(e){
  console.log(e)
}

// Crea un objeto de preferencia
    let preference = {

      items: (cart),
      
        back_urls:{
            success: 'http://localhost:3000/feedback',
            failure: 'http://localhost:3000/feedback',
        },
        // notification_url: 'https://4d53-190-16-66-223.sa.ngrok.io/checkout/notificar',
      
      };
      
      mercadopago.preferences.create(preference)
    .then(function (response) {
      res.send({ pref_id: response.body.id });

    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get('/success', (req, res) => {
  res.send('TODO OK');
});


module.exports = router;