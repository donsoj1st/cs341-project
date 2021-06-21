const express = require('express');
const admin = require("../controller/admin");
const athen = require('../authenMiddleware/authen_m');
const { check, body } = require('express-validator/check');


const route = express.Router()

route.get('/addProduct', athen, admin.addNewProduct);
route.post('/addProduct',[
    check("name", 'product name length must greater than 3').isAlphanumeric().isLength({ min: 3 }),
    body('image', 'invalid url').isURL(),
    body('price', 'price should be in 2 d.p').isFloat(),
    body('description', 'description length must be greater than 8').isLength({ min: 8 }).trim()
], athen, admin.addProduct);

route.get('/modify/:prodID', athen, admin.modify );
route.get('/deleted/:prodID', athen,admin.delete);
route.get('/updated/:prodID', athen, admin.updated);
route.post('/update/:prodID', [
    check("name",'product name length must be greater than 3').isAlphanumeric().isLength({ min: 3 }),
    body('image','invalid url').isURL(),
    body('price','price should be in 2 d.p').isFloat(),
    body('description','description length must be greater than 8').isLength({ min: 8 }).trim()
], athen, admin.lastUpdate)
route.get('/getAdminProducts', athen, admin.getProducts);
route.get('/getDberror', admin.getDberror);
//route.get('/login', admin.login);"">

module.exports = route