const express = require('express');
const admin = require("../controller/admin")

const route = express.Router()

route.get('/addProduct', admin.addNewProduct);
route.post('/addProduct', admin.addProduct)

route.get('/modify/:prodID', admin.modify );
route.get('/deleted/:prodID', admin.delete);
route.get('/updated/:prodID', admin.updated);
route.post('/update/:prodID', admin.lastUpdate)

module.exports = route