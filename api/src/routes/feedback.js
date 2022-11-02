const {Router} = require('express')
const router = Router()
const axios = require('axios')
const {Products, Orden} = require('../db');

router.get('/', async (req, res) => {
const {payment_id, status, payment_type, merchant_order_id} = req.body
try{
    const { data } = await axios.get(`https://api.mercadopago.com/merchant_orders/${merchant_order_id}?access_token=APP_USR-8763003876428984-102015-2626c522c3a666ad57ca4f935dabf886-1221748734`);
    const { items, paid_amount } = data;
    const order = await Orden.findOne({
        where: {
            total: paid_amount,
        }
    });

    if(status === 'approved'){
        const newItems = items.filter((e) => e.id !== '0');

        // order.setStateOrden('');

        await order.setStateOrden(2)

        newItems.map(async (e) => {
            let producto = await Products.findByPk(e.id)
            await Products.update({
                stock: (producto.dataValues.stock - e.quantity)
            }, {
                where: {
                    id: e.id
                }})
            });

        
        }else{
            // order.setStateOrden('');

            await order.setStateOrden(3)
        }
    }catch(e){
        console.log(e)
    }

res.status(200).send({payment_id, status, payment_type, merchant_order_id});
})

module.exports = router;

    //datos que devuelve el Feedback:

    // http://localhost:3000/?
    // collection_id=50830799641
    // &collection_status=approved
    // &payment_id=50830799641
    // &status=approved
    // &external_reference=null
    // &payment_type=credit_card
    // &merchant_order_id=6262016968
    // &preference_id=1221748734-60a74065-c2c5-4afe-a013-690671b32bb9
    // &site_id=MLA
    // &processing_mode=aggregator
    // &merchant_account_id=null