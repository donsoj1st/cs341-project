const express = require('express');
const product =require("../controller/product.js")
const athen = require('../authenMiddleware/authen_m');
const route = express.Router()

route.get('/', product.getProducts);
route.get('/details/:productid',product.getDetails);
route.get('/addToCart/:productid', athen, product.addtocat);
route.get('/getCart', athen,product.getCart);
route.get('/deleteCart/:delete',athen,product.deleteCart)
route.get('/order', product.postOrder)
route.get('/displayOrder', athen, product.getOrder)

module.exports = route