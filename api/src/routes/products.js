const {Router} = require('express')
const router = Router()

const { getDbInfo } = require('./controllers')




router.get('/', async function(req, res){
    try{
        const products = await getDbInfo();
        res.status(200).send(products)
    }catch(e){
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allProducts = await getDbInfo();
    try{
        if(id){
            const productId = allProducts.filter((e) => e.id == id);
            productId ? res.status(200).send(productId) : res.status(400).send('El producto no fue encontrado')
        }
    }catch(e){
        console.log(e)
    }
});

module.exports = router