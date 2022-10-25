const {Router, application} = require('express')
const router = Router()


//SDK de MercadPago
const mercadopago = require('mercadopago');

//Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-8763003876428984-102015-2626c522c3a666ad57ca4f935dabf886-1221748734'
});

router.post('/', (req, res) => {
// Crea un objeto de preferencia
    let preference = {

      items: (req.body),
      
        back_urls:{

            success: 'https://pg-henrymarket.vercel.app/feedback',
            failure: 'https://pg-henrymarket.vercel.app/feedback',

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

router.post('/notificar', async (req, res) => {
  try {
    const { body, query } = req;
    const topic = query.topic || query.type;
    var merchantOrder;

    switch (topic) {
      case "payment":
        const paymentId = query.id || query['data.id'];
        const payment = await mercadopago.payment.findById(paymentId);
        merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id)
        break;
      case "merchant_order":
        const orderId = query.id;
        merchantOrder = await mercadopago.merchant_orders.findById(orderId);
        break;
    }
    const { id, status } = merchantOrder.body.payments[0] ? merchantOrder.body.payments[0] : 'HOLA';
    const arrayDatos = [];

    if (id && status) {
      arrayDatos.push(id);
      arrayDatos.push(status)
    };
    console.log('Esto es DATOS', arrayDatos)
    res.status(200).send();
  } catch (e) {
    console.log(e)
  }
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
})
module.exports = router;