const {Router} = require('express');
const router = Router();

const { createScore, getScores } = require('./controllers');

router.get('/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        let product = await getScores(id);
        res.status(200).json(product)
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