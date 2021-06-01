const express = require('express');
const authen = require("../controller/authentic")

const route = express.Router()

route.get('/login', authen.login);
route.post('/login', authen.postLogin);
route.get('/logout', authen.logout);
route.get('/signup', authen.signup);
route.post('/signup', authen.postSignup);

module.exports = route