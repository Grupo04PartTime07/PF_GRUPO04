const {Router} = require('express')
const router = Router()

const { getProductsDb, createProduct, getProductDetail, updateProduct, deleteProduct} = require('./controllers')




router.get('/', async function(req, res){
    try{
        const { name, categorie, brand } = req.query;
        const products = await getProductsDb();
        if(name){
            let productName = products.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            productName.length ? res.status(200).send(productName) : res.status(200).send([{"name": "No contamos con el Producto en este momento", "price": null, "image": ["https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665938859/no-hay-resultados_wth0ex.png"],"id": 0,"stock": 100,}]);
        }else if(categorie){
            //let products = await getProductsDb();
            const productsFiltered = products.filter((e) => e.categories.includes(categorie));
            productsFiltered.length ? res.status(200).send(productsFiltered) : res.status(400).send('No hay productos dentro de la categoria')
        }else if(brand){
            const productsFiltered = products.filter((e) => e.brand.toLowerCase().includes(brand.toLowerCase()));
            productsFiltered.length ? res.status(200).send(productsFiltered) : res.status(400).send('No hay productos de esta marca')
        }else{
            res.status(200).send(products)
        }
    }catch(e){
        console.log(e)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        let nid = parseInt(id)
        const detail = await getProductDetail(nid);
        detail ? res.status(200).send(detail) : res.status(400).send('El producto no fue encontrado')
        console.log(id);
    }catch(e){
        console.log(e)
    }
});


router.post('/', async (req, res) => {
    try{
        const {name, price, description, image,stock, score, categories, brand} = req.body
        let created = await createProduct(name, price, description, image,stock, score, categories, brand)
        created ? res.status(200).json('El producto fue creado con exito!') : res.status(400).json('El producto no pudo ser creado');
    }catch(e){
        console.log(e)
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        let props = req.body;
        let result = await updateProduct(id, props);
        result ? res.status(200).json('El producto fue modificado con éxito!') : res.status(400).json('El producto no pudo ser modificado');
    }catch(e){
        console.log(e)
    }
});

router.delete('/', async function(req, res){
    const {id} = req.query
    try {
        let response = await deleteProduct(id)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
