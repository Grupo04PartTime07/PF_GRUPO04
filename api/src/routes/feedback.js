const {Router} = require('express')
const router = Router()
const axios = require('axios')
const {Products, Orden, Cart, Shipping} = require('../db');

router.post('/', async (req, res) => {
const {payment_id, status, payment_type, merchant_order_id} = req.body
try{
    const { data } = await axios.get(`https://api.mercadopago.com/merchant_orders/${merchant_order_id}?access_token=APP_USR-8763003876428984-102015-2626c522c3a666ad57ca4f935dabf886-1221748734`);
    console.log(data)
    const { items, total_amount } = data;
    const order = await Orden.findOne({
        where: {
            total: total_amount,
        },
        include: [
            {
                model: Cart,
                attributes: ['id']
            }
        ]
    });

    // const cart = await Cart.findOne({
    //     where: {
    //         id: order.cartId
    //     }
    // });

    if(status === 'approved'){
        const newItems = items.filter((e) => e.id !== '0');
        // const shipping = items.find((e) => e.id === '0');

        // switch(shipping.unit_price){
        //     case '299':
        //         let shipping1 = await Shipping.findByPk(1)
        //         await shipping1.setCart(cart.id)
        //     case '349':
        //         let shipping2 = await Shipping.findByPk(2)
        //         await shipping1.setCart(cart.id)
        //     case '399':
        //         let shipping3 = await Shipping.findByPk(3)
        //         await shipping2.setCart(cart.id)
        //     default:
        //         let shipping4 = await Shipping.findByPk(4)
        //         await shipping4.setCart(cart.id)
        // };

        await Orden.update({
            estado: merchant_order_id,
        },{
            where: {
                id: order.id
            }
        })

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
            await Orden.update({
                estado: merchant_order_id,
            },{
                where: {
                    id: order.id
                }
            })

            await order.setStateOrden(3)
        }
    }catch(e){
        console.log(e)
    }

res.status(200).send('Proceso de compra finalizado!');
})

module.exports = router;
