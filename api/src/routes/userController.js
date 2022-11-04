const axios = require('axios');
const {UserRegisted, Cart} = require('../db');


const getUsersRegisted = async () => {
    try{
        let users = await UserRegisted.findAll({
            where: {
                isDeleted: false,
                isBanned: false
            }

        //     include: [
        //         {
        //         model: Cart,
        //         attributes: ["id",	"dataSession",	"subtotal",	"orderId",	"isDeleted",	"createdAt"],
        //         through:{
        //             attributes: [],
        //         },
        //     },
        // ],
        })
        // let response = users.map(p =>{
        //     let carts = p.carts.map(e => e.id)
        //     return {id: p.id, name: p.name, price: p.price, description: p.description, image: p.image, 
        // categories, stock: p.stock, score: p.score_promedio, brand: p.brand.name }
        // })
        return users;
        
    }catch(e){
        console.log(e)
    }
};


const createUserRegisted = async (name, email) => {
    try {
        var newUser = await UserRegisted.create({
                name: name,
                email: email, 
                // description: description,
                // image: [image],
                // stock: stock,
                // score_promedio: score,
        });

        return newUser
    } catch (error) {
        console.log(error)
    }
};


const getUserDetail = async (email) => {
    try{
        let user = await UserRegisted.findOne({ where: { email: email } }, {
        //     include: [
        //         {
        //         model: Categories,
        //         attributes: ["name"],
        //         through:{
        //             attributes: [],
        //         },
        //     },

        //     {
        //         model: Brand,
        //         attributes: ["name"],              
        //     },

        //     {
        //         model: Promotion,
        //         attributes: ["option"],              
          
        //     },
        //     {
        //         model: Score,
        //         attributes: ["score", "coment", "id"],
        //     }
        // ],

        })


        if(user.isDeleted === true ){
            return /* 'User doesn\'t exist' */
        }

        else{
            let response = {name: user.name, email: user.email, isAdmin: user.isAdmin, isBanned:user.isBanned } 
            return response;
        }

    }
    catch(e){

       
           
            let response = {name: user.name, email: user.email, address: user.address, city: user.city, dni: user.dni,isAdmin: user.isAdmin, isBanned:user.isBanned }
    
        return response;
        
    }catch(e){

        console.log(e)
    }
};

const updateUserRegisted = async (email, name, surname, address, city, dni ) => {
    console.log(name);
    try {
        await UserRegisted.update(
            {
             name: name,
             surname: surname,
             address: address,	
             city: city,
             dni:dni

            //  image: [...props.image]
            }, {
                where: {
                    email: email
                }
            })

        let userModified = await UserRegisted.findOne({ where: { email: email } })
        return userModified
    } catch(e) {
        console.log(e)
    }
};


const updateUserRegistedAdmin = async ( name, email,surname, address, city, dni, isAdmin, isBanned) => {

    try {

        let user = UserRegisted.findOne({where: {email: email}})
        if(user.isDeleted === true){
            return 'The user doesn\'t exist' 
        }

        else{
            await UserRegisted.update(
                {
                 name: name,
                 isAdmin: isAdmin,
                 isBanned: isBanned,
                }, {
                    where: {
                        email: email
                    }
                })
    
            let userModified = await UserRegisted.findByPk(email)
            return userModified
        }

    } catch(e) {
        console.log(e)
    }
};

const deteleUserRegisted = async (email) => {
    try {

        let user = await UserRegisted.findOne({where: {email: email}})
        if(user.isDeleted === true ){
            return 'User doesn\'t exist'
        }
        else {
             await UserRegisted.update({
            isDeleted: true

        await UserRegisted.update(
            {
             name: name,
             isAdmin: isAdmin,
             isBanned: isBanned,
             surname: surname,	
             address:address,
             city:city,
             dni:dni

            //  image: [...props.image]

            }, {
                where: {
                    email: email
                }
            })

            return 'User deleted succesfully'
        }
       
    } catch (error) {
        console.log(error)


        let userModified = await UserRegisted.findOne({ where: { email: email } })
        return userModified
    } catch(e) {
        console.log(e)

    }

}

module.exports = {
    getUsersRegisted,
    createUserRegisted,
    updateUserRegistedAdmin,
    getUserDetail,
    updateUserRegisted,
    deteleUserRegisted
}
