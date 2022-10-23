const {Router} = require('express');
const router = Router();

const { createScore } = require('./controllers');

router.get('/', async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) =>{
    const { id, coment, score} = req.body
    try {
        createScore(id, score, coment);
        res.status(201).json('Gracias por su Opinion')
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;