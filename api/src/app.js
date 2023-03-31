const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { FRONT_URL = "http://localhost:3000" } = process.env;

const { getCategoriesDb, createCategory } = require("./routes/controllers");
const cors = require("cors");
const jwks = require("jwks-rsa");
const axios = require("axios");
const { expressjwt: expressJwt } = require("express-jwt");

require("./db.js");

const server = express();

const verifyJwt = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-bjfya7kf.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "PF",
  issuer: "https://dev-bjfya7kf.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({
  path: [
    "/",
    "/products",
    { url: /^\/products\/[0-9]/, methods: ["GET"] },
    "/recibeUser",
  ],
});

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

server.post("/bloquearUsuario2", bodyParser.json(), async (req, res) => {
  const { email } = req.body;
  const banned = false;
  //console.log(req.body);
  bloquearUsuario(email, banned);
}
);

server.post("/infoUserAuth0", bodyParser.json(), async (req, res) => {
  const { email } = req.body;

  //console.log(req.body);
  var rta;
  const emailModificado = "?email=" + email;
  const emailParam = emailModificado.replace("@", "%40");
  //console.log(emailParam);
 
  // const xavierEmail = "xavier@email.com";
  // var xavierID = "auth0|6350e7da5bdae0d184bf3d83";

  var request = require("request");
  //var request2 = require("request");
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
      console.log(body);
      rta = body[0].user_id;

      
    });
  });
}
);

server.post("/bloquearUsuario", bodyParser.json(), async (req, res) => {
  const { email } = req.body;

  //console.log(req.body);
  var rta;
  const emailModificado = "?email=" + email;
  const emailParam = emailModificado.replace("@", "%40");
  //console.log(emailParam);
  
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
        body: '{"blocked" : false }',

        //revisar como mandadr los parametersssssss
        //https://dev-bjfya7kf.us.auth0.com/api/v2/users-by-email?email=davidolivera8989%40gmail.com
      };

      request2(options2, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body);
        //console.log(body);
        //rta=(body[0].user_id);

        console.log("Respuesta usuario bloqueado " + rta);

        //console.log(id);
      });
    });
  });
}
);


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
        body: `{"password": ${clave}}`,
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


server.post("/reiniciarClave", bodyParser.json(), async (req, res) => {
    const { email } = req.body;
    //console.log(req.body);
    var rta;
    const emailModificado = "?email=" + email;
    const emailParam = emailModificado.replace("@", "%40");
    //console.log(emailParam);
    //console.log("?email=davidolivera8989%40gmail.com")
    //const xavierEmail = 'xavier@email.com' ;
    //var xavierID = 'auth0|6350e7da5bdae0d184bf3d83';

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
          body: '{"password": "Xavier_22"}',
        };

        request2(options2, function (error, response, body) {
          if (error) throw new Error(error);
          res.json(body);
          console.log(body);
          //rta=(body[0].user_id);
          console.log("Respuesta usuario con clave reiniciada  " + body);
          //console.log(id);
        });
      });
    });
  }
);

server.name = "API";
server.use(cors());
//server.use(verifyJwt);

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `https://henry-market.vercel.app/`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.post("/protectedUser", async function (req, res) {
  console.log(req);
  const accesToken = req.headers.authorization.split(" ")[1];
  const response = await axios.get(
    "https://dev-bjfya7kf.us.auth0.com/userInfo",
    {
      headers: {
        authorization: `Bearer ${accesToken}`,
      },
    }
  );
  const userInfo = response;
  console.log(userInfo);
  res.send(userInfo);
});

server.get("/protectedUser", async function (req, res) {
  try {
    const accesToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-bjfya7kf.us.auth0.com/userInfo/",
      {
        headers: {
          authorization: `Bearer ${accesToken}`,
        },
      }
    );
    const userInfo = response.data;
    console.log(userInfo);
    res.send(userInfo);
  } catch (error) {
    res.send(error.message);
  }
});

// server.post("/categories", async (req, res) => {
//   console.log(req);
//   try {
//     const { name, image } = req.body;
//     let categoryCreated = await createCategory(name, image);
//     categoryCreated
//       ? res.status(200).json("La categoria fue creada con exito!")
//       : res.status(400).json("La categoria no puedo ser creada");
//   } catch (e) {
//     console.log(e);
//   }
// });

module.exports = server;
