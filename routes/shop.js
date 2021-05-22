const express = require('express');
const product =require("../controller/product.js")

const route = express.Router()

route.get('/', product.getProducts);
route.get('/details/:productid',product.getDetails);
route.get('/addToCart/:productid', product.addtocat);
route.get('/getCart', product.getCart);
route.get('/deleteCart/:delete',product.deleteCart)

module.exports = route