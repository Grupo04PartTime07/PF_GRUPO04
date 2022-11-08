

const { Router } = require('express');
const router = Router();
const { Promotion } = require('../db');

const { getPromotionDb, createPromotion, updateScoreUser, getScoresUser } = require('./controllers');

router.get('/', async (req, res) => { 
    try{
        const promotion = await getPromotionDb();
        res.status(200).json(promotion);
        // console.log(promotion[18].userRegistedId)
    }catch(e){
        console.log(e) 
    }
});

router.get('/search', async (req, res) =>{
    // console.log("esto es req",req)
    const id = req.query.id
    try {
        let score = await getScoresUser(id);
        if (score.promotions.length > 0){
        let reduce = score.promotions.reduce((acumulador, actual) => acumulador + actual.value, 0);
console.log(reduce)
    res.status(200).json(reduce)}
            else{
                res.status(200).json(0)
            }

        // console.log('SOY SCORE',score.promotions)
    } catch (error) {
        res.status(400).json(0)
    }
})

router.post('/', async (req, res) => {
    console.log("req.body",req.body)
    try{
        const { option, value, userRegistedId } = req.body;
        let promotionCreated = await createPromotion(option, value, userRegistedId);
        promotionCreated ? 
        res.status(200).json('Los puntos se sumaron con éxito!') : 
        res.status(400).json('Los punton no se sumaron');
        console.log("esto es promotionCreated",promotionCreated)
    }catch(e){
        console.log(e);
    }
})


module.exports = router;