const {Router} = require('express')
const router = Router()

const { getProductsDb } = require('./controllers')




router.get('/', async function(req, res){
    try{
        const { name, categorie } = req.query;
        const products = await getProductsDb();
        if(name){
            let productName = products.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            productName ? res.status(200).send(productName) : res.status(400).send('El producto no fue encontrado');
        }else if(categorie){
            //let products = await getProductsDb();
            const productsFiltered = products.filter((e) => e.categories.includes((c) => c.name.toLowerCase()==categorie.toLowerCase()));
            productsFiltered ? res.status(200).send(productsFiltered) : res.status(400).send('No hay productos dentro de la categoria')
        }else{
            res.status(200).send(products)
        }
    }catch(e){
        console.log(e)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allProducts = await getProductsDb();
    try{
        if(id){
            
            const productId = allProducts.filter((e) => e.id == id);
            productId ? res.status(200).send(productId) : res.status(400).send('El producto no fue encontrado')
        }
        console.log(id);
    }catch(e){
        console.log(e)
    }
});

module.exports = router