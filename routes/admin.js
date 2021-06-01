const express = require('express');
const admin = require("../controller/admin");
const athen = require('../authenMiddleware/authen_m');


const route = express.Router()

route.get('/addProduct', athen, admin.addNewProduct);
route.post('/addProduct', athen, admin.addProduct)

route.get('/modify/:prodID', athen, admin.modify );
route.get('/deleted/:prodID', athen,admin.delete);
route.get('/updated/:prodID', athen, admin.updated);
route.post('/update/:prodID', athen, admin.lastUpdate)
//route.get('/login', admin.login);

module.exports = route