const { Router } = require('express');
const router = Router();
const { Categories, Products } = require('../db');

router.get('/', async (req, res)=>{
    const categories = await Categories.findAll();
    res.status(200).send(categories)
});

module.exports = router;