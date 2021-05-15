const express = require('express');
const product =require("../controller/product.js")

const route = express.Router()

route.get('/', product.getProducts);
route.get('/details/:productid',product.getDetails);

module.exports = route