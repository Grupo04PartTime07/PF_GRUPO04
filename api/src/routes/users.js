const { Router } = require('express');
const UserRegisted = require('../models/UserRegisted');
const router = Router();


const { getUsersRegisted, createUserRegisted, getUserDetail, updateUserRegisted, deteleUserRegisted, updateUserRegistedAdmin} = require('./userController')

router.get('/', async function(req, res){
    try{
        //const { name, categorie, brand } = req.query;
        const users = await getUsersRegisted();
        res.status(200).send(users);
    }catch(e){
        console.log(e)
    }
    
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;
    try{
        const user = await getUserDetail(email);
        user ? res.status(200).send(user) : res.status(400).send('El usuario no fue encontrado')

        console.log(email);

        console.log(email+" "+user);

    }catch(e){
        console.log(e)
    }
});




router.post('/', async (req, res) => {
    try{
        const {name, email} = req.body

        const user = await getUserDetail(email);
        if (!user){
        let created = await createUserRegisted(name, email)
        created ? res.status(200).json({message:'El usuario fue creado con exito!', userRegisted:created}) : res.status(400).json('El usuario no pudo ser creado');
        } else res.status(200).json({message:'El usuario ya existe', userRegisted:user});
    }catch(e){
        console.log(e)
    }
});

router.put('/admin/', async (req, res) => {
    try{
        const { name, email,  surname, address, city, dni, isAdmin, isBanned, password, cambiaPassword } = req.body;
        //let props = req.body;

        let result = await updateUserRegistedAdmin( name, email,  surname, address, city, dni, isAdmin, isBanned, password, cambiaPassword );

        result ? res.status(200).send('El usuario fue modificado con éxito!') : res.status(400).send('El usuario no pudo ser modificado');
    }catch(e){
        console.log(e)
    }
});


router.delete('/:email', async function(req, res){
    try{
        const {email} = req.params
        let result = await deteleUserRegisted(email)
        res.status(200).send(result)
    }
    catch(error){
        console.log(error)
    }
})

router.put('/', async (req, res) => {
    try{
        const { email, name, surname, address, city, dni  } = req.body;
        
        //let props = req.body;
        let result = await updateUserRegisted(email, name, surname, address, city, dni);
        result ? res.status(200).send({message:'El usuario fue modificado con éxito!', result}) : res.status(400).send('El usuario no pudo ser modificado');
    }catch(e){
        console.log(e)
    }
});


module.exports = router
