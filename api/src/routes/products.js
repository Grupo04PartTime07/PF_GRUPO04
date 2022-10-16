const {Router} = require('express')
const router = Router()

const { getProductsDb } = require('./controllers')




router.get('/', async function(req, res){
    try{
        const { name, categorie } = req.query;
        const products = await getProductsDb();
        if(name){
            let productName = products.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            productName.length ? res.status(200).send(productName) : res.status(200).send([{"name": "No contamos con el Producto en este momento", "price": null, "image": ["https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665938859/no-hay-resultados_wth0ex.png"],"id": 0,"stock": 100,}]);
        }else if(categorie){
            //let products = await getProductsDb();
            console.log(categorie)
            const productsFiltered = products.filter((e) => e.categories.includes(categorie));
            productsFiltered.length ? res.status(200).send(productsFiltered) : res.status(400).send('No hay productos dentro de la categoria')
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