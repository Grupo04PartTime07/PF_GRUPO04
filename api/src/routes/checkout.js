const {Router, application} = require('express')
const router = Router()
const { Cart, User, Products, } = require('../db');


//SDK de MercadPago
const mercadopago = require('mercadopago');

//Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-8763003876428984-102015-2626c522c3a666ad57ca4f935dabf886-1221748734'
});

router.post('/', async (req, res) => {

  const { idCart, cart, subtotal } = req.body
  const carrito = await Cart.findByPk(idCart);

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

  }else{

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

  };
}catch(e){
  console.log(e)
}

// Crea un objeto de preferencia
    let preference = {

      items: (cart),
      
        back_urls:{
            success: 'http://localhost:3001/feedback',
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

// router.post('/notificar', async (req, res) => {
//   try {
//     const { body, query } = req;
//     const topic = query.topic || query.type;
//     var merchantOrder;

//     switch (topic) {
//       case "payment":
//         const paymentId = query.id || query['data.id'];
//         const payment = await mercadopago.payment.findById(paymentId);
//         merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id)
//         break;
//       case "merchant_order":
//         const orderId = query.id;
//         merchantOrder = await mercadopago.merchant_orders.findById(orderId);
//         break;
//     }
//     const { id, status } = merchantOrder.body.payments[0] ? merchantOrder.body.payments[0] : 'HOLA';
//     const arrayDatos = [];

//     if (id && status) {
//       arrayDatos.push(id);
//       arrayDatos.push(status)
//     };
//     console.log('Esto es DATOS', arrayDatos)
//     res.status(200).send();
//   } catch (e) {
//     console.log(e)
//   }
// });

// router.get('/feedback', function (req, res) {

//   const { payment_id, status, merchant_order_id } = req.query; 

//   try{
//       res.status(200).json({
//         Payment: payment_id,
//         Status: status,
//         MerchantOrder: merchant_order_id
//       });
//   }catch(e){
//     console.log(e)
//   }
// });
module.exports = router;