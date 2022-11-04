const {Router} = require('express');
const router = Router();

const { createScore, getScores, updateScoreProm, deleteScore } = require('./controllers');

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
        await createScore(id, score, coment);     
        res.status(201).json('Gracias por su Opinion')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        let response = await updateScoreProm(id)
        res.status(201).json(response)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:id', async(req, res) => {
    const {idReview} = req.query
    try{
        let result = await deleteScore(idReview)
        res.status(200).send(result)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;