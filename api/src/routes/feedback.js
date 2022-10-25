const {Router} = require('express')
const router = Router()

router.get('/',(req, res) => {
const {payment_id, status, payment_type, merchant_order_id} =req.query
res.send({payment_id, status, payment_type, merchant_order_id})
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