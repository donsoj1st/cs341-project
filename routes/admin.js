const express = require('express');
const admin = require("../controller/admin")

const route = express.Router()

route.get('/addProduct', admin.addNewProduct);
route.post('/addProduct',admin.addProduct)

module.exports = route