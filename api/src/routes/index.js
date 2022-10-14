const { Router } = require('express');

const mwcategories = require('./categories')
const mwproducts = require('./products')
const router = Router();

router.use('/categories', mwcategories);
router.use('/products', mwproducts)



module.exports = router;
