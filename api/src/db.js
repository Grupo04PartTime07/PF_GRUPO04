require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//const StateOrden = require('./models/StateOrden');
//const Checkout = require('./models/Checkout');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env; 

//const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/market`, {

const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  
//const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Categories, Products, Brand, Promotion, Score, 
              Cart, Order, Guest, UserRegisted, Profile, StateOrden, Invoice, WishList, Checkout, Orden,  Shipping, StateCarrito, Shipping_Cart } = sequelize.models;
                                                          

Products.belongsToMany(Categories, {through: 'product_category'});
Categories.belongsToMany(Products, {through: 'product_category'});

Brand.hasMany(Products);
Products.belongsTo(Brand);

Promotion.hasMany(Products);
Products.belongsTo(Promotion);

Promotion.belongsTo(UserRegisted);
UserRegisted.hasMany(Promotion);

Products.hasMany(Score);
Score.belongsTo(Products);

Products.belongsToMany(Cart, {through: 'cart_product'});
Cart.belongsToMany(Products, {through: 'cart_product'});

// Products.belongsToMany(Order, {through: 'order_product'});
// Order.belongsToMany(Products, {through: 'order_product'});

// Order.hasOne(Cart);
// Cart.belongsTo(Order);

Cart.hasOne(Guest);
Guest.belongsTo(Cart);

UserRegisted.hasMany(Cart);
Cart.belongsTo(UserRegisted);

// UserRegisted.hasMany(Order);
// Order.belongsTo(UserRegisted);

// Profile.hasMany(UserRegisted);
// UserRegisted.belongsTo(Profile);

//Client.hasMany(Order);
//Order.belongsTo(Client);

// Order.hasOne(Invoice);
// Invoice.belongsTo(Order);

UserRegisted.hasOne(WishList);
WishList.belongsTo(UserRegisted);

WishList.belongsToMany(Products, {through: 'wishList_product'});
Products.belongsToMany(WishList, {through: 'wishList_product'});

// Cart.hasOne(Checkout);
// Checkout.belongsTo(Cart);

Shipping.belongsToMany(Cart, {through: Orden});
Cart.belongsToMany(Shipping, {through: Orden});

// Shipping.hasMany(Cart);
// Cart.belongsTo(Shipping); 

StateCarrito.hasMany(Cart);
Cart.belongsTo(StateCarrito); 
//console.table(Cart);
//console.table(Shipping_Cart);
Orden.hasOne(Invoice);
Invoice.belongsTo(Orden);

////
Cart.hasOne(Orden);
Orden.belongsTo(Cart);
////


Orden.hasOne(Checkout);
Checkout.belongsTo(Orden);

StateOrden.hasMany(Orden);
Orden.belongsTo(StateOrden); 


// **Agregar las relaciones aqui**

module.exports = {
  ...sequelize.models,
  conn: sequelize, 
};
