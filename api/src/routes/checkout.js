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
       
        // notification_url: 'https://478d-190-16-66-223.sa.ngrok.io/checkout/notificar',
        items: [
          {
            title: "Mi producto",
            unit_price: 100,
            quantity: 3,
          },
        ],
        back_urls:{
          success: 'http://localhost:3000',
          // failure: 'https://478d-190-16-66-223.sa.ngrok.io/checkout/feedback',
          // pending: 'https://478d-190-16-66-223.sa.ngrok.io/checkout/feedback',
      }
      };
      
      mercadopago.preferences.create(preference)
        .then(function (response) {
        res.redirect(response.body.init_point);
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
    console.log('Estoy imprimiendo porque la ruta es esta.')
    // console.log('Esto es ID', id);
    // console.log('Esto es status', status);
    res.status(200).send();
  }catch(e){
    console.log(e)
  }

});

router.get('/feedback', function (req, res) {
  console.log(req.query.payment_id)
  console.log(req.query.status)
  console.log(req.query.merchant_order_id)

	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});


module.exports = router;