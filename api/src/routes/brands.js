const { Router } = require('express');
const router = Router();
const { Brand } = require('../db');

const { getBrandsDb, createBrand, deleteBrand } = require('./controllers');

router.get('/', async (req, res) => { 
    try{
        const brands = await getBrandsDb();
        res.status(200).send(brands);
    }catch(e){
        console.log(e) 
    }
});

router.post('/', async (req, res) => {
    try{
        const { name, image } = req.body;
        let brandCreated = await createBrand(name, image);
        brandCreated ? res.status(200).send('La marca fue creada con éxito!') : res.status(400).send('La marca no pudo ser creada');
    }catch(e){
        console.log(e);
    }
})

router.put('/', async (req, res) => {
    try {
        const { name, image, id } = req.body;
        console.log("put", name)
        await Brand.update({ name: name, image: image}, {where:{id:id}})
        res.status(201).json("Modificado con Exito")
    } catch (error) {
        console.log(e)
    }
})

router.delete('/', async function(req, res){
    const {id} = req.query
    try{
        let deleted = await deleteBrand(id)
        res.status(200).send(deleted)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;