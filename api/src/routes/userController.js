const axios = require('axios');
const {UserRegisted, Cart} = require('../db');


const getUsersRegisted = async () => {
    try{
        let users = await UserRegisted.findAll({
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
        //     return {id: p.id, name: p.name, price: p.price, description: p.description, image: p.image, categories, stock: p.stock, score: p.score_promedio, brand: p.brand.name }
        // })
        return response;
        
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
       
           
            let response = {name: user.name, email: user.email, isAdmin: user.isAdmin, isBanned:user.isBanned }
    
        return response;
        
    }catch(e){
        console.log(e)
    }
};

const updateUserRegisted = async (email, name, isAdmin, isBanned) => {

    try {
        await UserRegisted.update(
            {
             name: name,
             isAdmin: isAdmin,
             isBanned: isBanned,
            //  image: [...props.image]
            }, {
                where: {
                    email: email
                }
            })

        let userModified = await UserRegisted.findByPk(email)
        return userModified
    } catch(e) {
        console.log(e)
    }
};

module.exports = {
    getUsersRegisted,
  
    createUserRegisted,
   
    getUserDetail,
    updateUserRegisted
}
