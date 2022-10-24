const {Router} = require('express')
const router = Router()

const {Products} = require('../db')

router.put('/:id', async function(req, res){
    const {id} = req.params
    const {newStock} = req.body
    try {
        const Prod = await Products.findByPk(id)
    
        await Prod.update({stock: newStock})

        /*let msg
        if(updatedProd[0] === 1){
            msg = 'Stock updated correctly'
        }
       /*  const updatedProd = await Products.findByPk(idProd) */
        res.status(200).json("Inventario Actualizado correctamente")

    } catch (error) {
        console.log(error)
    }
})

module.exports = router