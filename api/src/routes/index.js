const { Router } = require('express');

const mwcategories = require('./categories')

const router = Router();

router.use('/categories', mwcategories);


module.exports = router;
