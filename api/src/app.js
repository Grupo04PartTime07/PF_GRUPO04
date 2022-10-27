const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { FRONT_URL = 'http://localhost:3000' } = process.env

const { getCategoriesDb, createCategory } = require('./routes/controllers');
const cors = require('cors');
const jwks = require('jwks-rsa');
const axios = require('axios');
const {expressjwt: expressJwt} = require('express-jwt');

require('./db.js'); 

const server = express();

const verifyJwt = expressJwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-bjfya7kf.us.auth0.com/.well-known/jwks.json'
}),
audience: 'PF',
issuer: 'https://dev-bjfya7kf.us.auth0.com/',
algorithms: ['RS256']
}).unless({path:[ '/', '/products', { url: /^\/products\/[0-9]/, methods: ['GET'] }, '/recibeUser']});


server.name = 'API';
server.use(cors()); 
//server.use(verifyJwt);

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

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
