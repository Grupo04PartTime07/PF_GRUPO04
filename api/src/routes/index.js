const { Router } = require('express');

const mwcategories = require('./categories')
const mwproducts = require('./products')
const mwproduct = require('./product')
const router = Router();

router.use('/categories', mwcategories);
router.get('/products', mwproducts)
router.get('/products/:id', mwproduct)


module.exports = router;
