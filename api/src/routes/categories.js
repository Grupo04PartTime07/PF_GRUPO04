const { Router } = require('express');
const router = Router();
const { Categories } = require('../db');

const { getCategoriesDb, createCategory } = require('./controllers');

router.get('/', async (req, res)=>{
    try{
        const categories = await getCategoriesDb();
        res.status(200).send(categories)
    }catch(e){
        console.log(e)
    }

});

router.post('/', async (req,res) => {
    try{
        const { name, image } = req.body;
        let categoryCreated = await createCategory(name, image);
        categoryCreated ? res.status(200).json('La categoria fue creada con exito!') : res.status(400).json('La categoria no puedo ser creada');
    }catch(e){
        console.log(e)
    }
})

router.put('/', async (req, res) => {
    try {
        const { name, image, id } = req.body;
        await Categories.update({ name: name, image: image}, {where:{id:id}})
        res.status(201).json("Modificado con Exito")
    } catch (error) {
        console.log(e)
    }
})

module.exports = router;