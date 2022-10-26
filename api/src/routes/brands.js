const { Router } = require('express');
const router = Router();

const { getBrandsDb, createBrand } = require('./controllers');

router.get('/', async (req, res) => { 
    try{
        const brands = await getBrandsDb();
        res.status(200).send(brands);
    }catch(e){
        console.log(e)
    }
});

router.post('/', async function(req, res){
    try {
        const { name, image } = req.body
        let brandCreated = await createBrand(name, image)
        brandCreated ? res.status(200).json('Brand succesfully created!') : res.status(400).json('Brand cant be created');
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;
