const { Router } = require('express');

const mwcategories = require('./categories')
const mwproducts = require('./products')
//const mwserver = require('./server') 
const router = Router();

router.use('/categories', mwcategories);
router.use('/products', mwproducts)
//router.use('/server', mwserver);


module.exports = router;
