const { Router } = require('express');

const mwcategories = require('./categories')
const mwproducts = require('./products')
const mwbrands = require('./brands') 
//const mwcart = require('./cart')
const mwinventory = require('./inventory')
const mwcheckout = require('./checkout')
const mwreview = require('./reviews') 
const mwusers = require('./users') 
const mwfeedback = require('./feedback')
//const mwserver = require('./server') 

const router = Router();

router.use('/categories', mwcategories);
router.use('/products', mwproducts);
router.use('/brands', mwbrands);
//router.use('/cart', mwcart)
router.use('/inventory', mwinventory)
router.use('/checkout', mwcheckout);
router.use('/reviews', mwreview)
router.use('/users', mwusers);
router.use('/feedback', mwfeedback);
//router.use('/server', mwserver);


module.exports = router;
