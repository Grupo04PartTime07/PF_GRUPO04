const { Router } = require('express');
const router = Router();

const { getCategoriesDb } = require('./controllers');

router.get('/', async (req, res)=>{
    try{
        const categories = await getCategoriesDb();
        res.status(200).send(categories)
    }catch(e){
        console.log(e)
    }

});

module.exports = router;