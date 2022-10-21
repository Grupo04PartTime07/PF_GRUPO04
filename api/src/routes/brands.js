const { Router } = require('express');
const router = Router();

const { getBrandsDb } = require('./controllers');

router.get('/', async (req, res) => {
    try{
        const brands = await getBrandsDb();
        res.status(200).send(brands);
    }catch(e){
        console.log(e)
    }
});

module.exports = router;