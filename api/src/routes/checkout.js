const {Router, application} = require('express')
const router = Router()
const axios = require('axios')

//SDK de MercadPago
const mercadopago = require('mercadopago');

//Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-8763003876428984-102015-2626c522c3a666ad57ca4f935dabf886-1221748734'
});

router.post('/', async (req, res) => {
    // Crea un objeto de preferencia
    let preference = {
        back_url:{
            success: 'https://4d53-190-16-66-223.sa.ngrok.io/success',
        },
        notification_url: 'https://4d53-190-16-66-223.sa.ngrok.io/checkout/notificar',
        items: [
          {
            title: "Mi producto",
            unit_price: 100,
            quantity: 3,
          },
        ],
      };
      
      mercadopago.preferences.create(preference)
        .then(function (response) {
        res.send(response.body);
        })
        .catch(function (error) {
          console.log(error);
        });

      
      
});

router.get('/success', (req, res) => {
  res.send('TODO OK');
});

router.post('/notificar', async (req, res) => {
  try{
    // console.log('notificar')
    const {body, query} = req;
    // const urlResource = query.id
    // console.log('esto es ID', urlResource);
    // mercadopago.merchant_orders.findById(urlResource).then(res => console.log(res.body))
    const topic = query.topic || query.type;
    // console.log({ topic });
    var merchantOrder;
  
    switch (topic) {
      case "payment":
        const paymentId = query.id || query['data.id'];
        // console.log(topic, 'getting payment', paymentId);
        const payment = await mercadopago.payment.findById(paymentId);
        // console.log(topic, 'getting merchant order');
        merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id)
        break;
      case "merchant_order":
        const orderId = query.id;
        // console.log(topic, 'getting merchant order', orderId);
        merchantOrder = await mercadopago.merchant_orders.findById(orderId);
        break;
    }
    // console.log('ESTO ES EL RECIBO', merchantOrder.body.payments);
    const {id, status} = merchantOrder.body.payments[0] ? merchantOrder.body.payments[0] : 'HOLA';
    const arrayDatos = [];
    
    if(id && status){
      arrayDatos.push(id);
      arrayDatos.push(status)
    };
    console.log('Esto es DATOS', arrayDatos)
    // console.log('Esto es ID', id);
    // console.log('Esto es status', status);
    res.status(200).send();
  }catch(e){
    console.log(e)
  }

});

module.exports = router;