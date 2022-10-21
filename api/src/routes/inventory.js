const {Router} = require('express')
const router = Router()

const {Products} = require('../db')

router.put('/', async function(req, res){
    const {name, newStock} = req.body
    try {
        const Prod = await Products.findOne({
            where:{
                name: name
            }
        })
    
        const idProd = Prod.id 
        const updatedProd = await Products.update({
            stock: newStock
        }, {
            where: {
                id: idProd
            }
        })
        let msg
        if(updatedProd[0] === 1){
            msg = 'Stock updated correctly'
        }
       /*  const updatedProd = await Products.findByPk(idProd) */
        res.status(200).send(msg)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router