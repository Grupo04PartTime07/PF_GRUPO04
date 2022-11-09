const axios = require('axios');
const {UserRegisted, Cart} = require('../db');
//const {bloquearUsuario} = import ('../app');

const getManageApiMtoM = () => {
    var request = require("request");
  
    return new Promise(function (resolve, rejected) {
      var options = {
        method: "POST",
        url: "https://dev-bjfya7kf.us.auth0.com/oauth/token",
        headers: { "content-type": "application/json" },
        body: '{"client_id":"RLmir7ItxLcyiRlklFfKJO0OI4zbTRLP","client_secret":"iuaA5JzrlqP8cLE7T3gPc846zX709LOH8cJYH3HuNArEy7hmVvTpDJAW8Ldw28Xb","audience":"https://dev-bjfya7kf.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
      };
  
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
        //console.log(body);
      });
    });
  };
  
const bloquearUsuario= (email, banned) => {
//const { email } = req.body;

//console.log(req.body);
var rta;
const emailModificado = "?email=" + email;
const emailParam = emailModificado.replace("@", "%40");
//console.log(emailParam);
//console.log("?email=davidolivera8989%40gmail.com")
// const xavierEmail = "xavier@email.com";
// var xavierID = "auth0|6350e7da5bdae0d184bf3d83";

var request = require("request");
var request2 = require("request");
getManageApiMtoM().then((data) => {
    const token = data.access_token;
    var options = {
    method: "GET",
    url:
        "https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email"+emailParam,
    //url: 'https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com',
    headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
    },

    //revisar como mandadr los parametersssssss
    //https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com
    json: true,
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //res.json(body)
    //console.log(body);
    rta = body[0].user_id;

    console.log("Id usuario a bloquear " + rta);

    //console.log(id);
    var idUsuarioModificar;
    idUsuarioModificar = rta.replace("|", "%7C");
    //rta.includes('google')? idUsuarioModificar

    // const token = data.access_token
    var options2 = {
        method: "PATCH",
        url:
        "https://dev-bjfya7kf.us.auth0.com/api/v2/users/" +
        idUsuarioModificar,
        //url: 'https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com',
        headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        },
        body: `{"blocked" : ${banned} }`,

        //revisar como mandadr los parametersssssss
        //https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com
    };

    request2(options2, function (error, response, body) {
        if (error) throw new Error(error);
        //res.json(body);
        //console.log(body);
        //rta=(body[0].user_id);

        console.log("Respuesta usuario bloqueado " + body);

        //console.log(id);
    });
    });
});
};

const eliminarUsuario= (email) => {
    //const { email } = req.body;
    
    //console.log(req.body);
    var rta;
    const emailModificado = "?email=" + email;
    const emailParam = emailModificado.replace("@", "%40");
    //console.log(emailParam);
    //console.log("?email=davidolivera8989%40gmail.com")
    // const xavierEmail = "xavier@email.com";
    // var xavierID = "auth0|6350e7da5bdae0d184bf3d83";
    
    var request = require("request");
    var request2 = require("request");
    getManageApiMtoM().then((data) => {
        const token = data.access_token;
        var options = {
        method: "GET",
        url:
            "https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email"+emailParam,
        //url: 'https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com',
        headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    
        //revisar como mandadr los parametersssssss
        //https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com
        json: true,
        };
    
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //res.json(body)
        //console.log(body);
        rta = body[0].user_id;
    
        console.log("Id usuario a bloquear " + rta);
    
        //console.log(id);
        var idUsuarioModificar;
        idUsuarioModificar = rta.replace("|", "%7C");
        //rta.includes('google')? idUsuarioModificar
    
        // const token = data.access_token
        var options2 = {
            method: "DELETE",
            url:
            "https://dev-bjfya7kf.us.auth0.com/api/v2/users/" +
            idUsuarioModificar,
            //url: 'https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com',
            headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
            },
            //body: `{"blocked" : ${banned} }`,
    
            //revisar como mandadr los parametersssssss
            //https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com
        };
    
        request2(options2, function (error, response, body) {
            if (error) throw new Error(error);
            //res.json(body);
            //console.log(body);
            //rta=(body[0].user_id);
    
            console.log("Respuesta usuario ELIMINADO " + body);
    
            //console.log(id);
        });
        });
    });
    };

const reiniciarClave = (email, clave)=>  {
    //const { email } = req.body;
    //console.log(req.body);
    var rta;
    const emailModificado = "?email=" + email;
    const emailParam = emailModificado.replace("@", "%40");
   
    var request = require("request");
    var request2 = require("request");
    getManageApiMtoM().then((data) => {
      const token = data.access_token;
      var options = {
        method: "GET",
        url:
          "https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email" +emailParam,
        //url: 'https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com',
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },      
        //revisar como mandadr los parametersssssss
        //https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com
        json: true,
      };
  
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //res.json(body)
        //console.log(body);
        rta = body[0].user_id;
        console.log("Id usuario a reiniciar clave:  " + rta);
        //console.log(id);
        var idUsuarioModificar;
        idUsuarioModificar = rta.replace("|", "%7C");
        //rta.includes('google')? idUsuarioModificar
        // const token = data.access_token
        var options2 = {
          method: "PATCH",
          url: "https://dev-bjfya7kf.us.auth0.com/api/v2/users/" + idUsuarioModificar,
          //url: 'https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com',
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: `{"password": "${clave}" }`,
          
        };
  
        request2(options2, function (error, response, body) {
          if (error) throw new Error(error);
         
          //rta=(body[0].user_id);
          console.log("Respuesta usuario con clave reiniciada  " + body);
          //console.log(id);
        });
      });
    });
};

const getUsersRegisted = async () => {
    try{
        let users = await UserRegisted.findAll({
             where: {
                 isDeleted: false,
            //     // isBanned: false
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
        let user = await UserRegisted.findOne({ where: { email: email} })
            // isDeleted:false
            


        if(user.isDeleted === true ){
            user.update({isDeleted:false});
            //user.isDeleted = false
            return user;
        }
        else{
            let response = {name: user.name, email: user.email, address: user.address, city: user.city, dni: user.dni,isAdmin: user.isAdmin, isBanned:user.isBanned }
            return response;
        }
    }
    catch(e){
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


const updateUserRegistedAdmin = async ( name, email,surname, address, city, dni, isAdmin, isBanned, password, cambiaPassword ) => {

    try {

        //let user = UserRegisted.findOne({where: {email: email}})
        // if(user.isDeleted === true){
        //     return 'The user doesn\'t exist' 
        // }

        
            await UserRegisted.update(
                {
                    name: name,
                    isAdmin: isAdmin,
                    isBanned: isBanned,
                    surname: surname,	
                    address:address,
                    city:city,
                    dni:dni
                }, {
                    where: {
                        email: email
                    }
                })
    
            let userModified = await UserRegisted.findOne({where: {email: email}})
            
            console.log("passss   "+password);
            console.log("cambia "+cambiaPassword);
            if (cambiaPassword){
                reiniciarClave(email, password);
            }
            
            bloquearUsuario(email, isBanned);
            
            return userModified
    } catch(e) {
        console.log(e)
    }
};

const deteleUserRegisted = async (email) => {
    try {
        console.log("DeleteUserRegisted"+email)

        let user = await UserRegisted.findOne({where: {email: email}})
        console.log(user);

        // if(user.isDeleted == true ){
        //     return 'Usuario no encontrado'
        // }
        // else {
            user.update({
             isDeleted: true
             })
        eliminarUsuario(email);
        return 'El Usuario fue eliminado exitosamente'
        }
       
     catch (error) {
        console.log(error)

}}

module.exports = {
    getUsersRegisted,
    createUserRegisted,
    updateUserRegistedAdmin,
    getUserDetail,
    updateUserRegisted,
    deteleUserRegisted
}
