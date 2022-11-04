const { Router } = require('express');
const router = Router();
const { Promotion } = require('../db');

const { getPromotionDb, createPromotion, updateScoreUser } = require('./controllers');

router.get('/', async (req, res) => { 
    try{
        const promotion = await getPromotionDb();
        res.status(200).send(promotion);
        console.log(promotion)
    }catch(e){
        console.log(e) 
    }
});

router.post('/', async (req, res) => {
    console.log("req.body",req.body)
    try{
        const { option, value, userRegistedId } = req.body;
        let promotionCreated = await createPromotion(option, value, userRegistedId);
        promotionCreated ? res.status(200).send('Los puntos se sumaron con éxito!') : res.status(400).send('Los punton no se sumaron');
        console.log("esto es promotionCreated",promotionCreated)
    }catch(e){
        console.log(e);
    }
})

router.put('/', async (req, res) => {
    console.log("req.body",req.body)
    try {
        const { option, value, userRegistedId } = req.body;
        console.log("put", value)
        await updateScoreUser(option, value, userRegistedId)
        res.status(201).json("Modificado con Exito")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;