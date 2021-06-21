const express = require('express');
const authen = require("../controller/authentic");
const person = require('../model/user');
const {check, body} = require('express-validator/check');
const bcrypt = require('bcryptjs');

const route = express.Router()

route.get('/login', authen.login);
route.post('/login', [
    check('email').isEmail().withMessage('please enter a valid email.').normalizeEmail(),
    body('password', 'password with min length of 6 alphaNumeric').isLength({ min: 5 }).isAlphanumeric().trim()
], authen.postLogin);
route.get('/logout', authen.logout);
route.get('/signup', authen.signup);
route.post('/signup',[ 
    check('email').isEmail().withMessage('please enter a valid email.').normalizeEmail().custom((value, { req }) => {
        return person.findOne({ email: value }).then(result => {
            //console.log(result)
            if (result) {
                console.log('ademi is here')
                return Promise.reject("email already exits please choose another one")
            }
        })
    }),
    body('password', 'password with min length of 6 alphaNumeric').isLength({min: 6}).isAlphanumeric().trim(),
    body('Cpassword').trim().custom((value,{req})=>{
       if (value !== req.body.password) {
           throw new Error('password mismatch.');
       } 
       return true;
    }),
], authen.postSignup);
route.get('/reset', authen.reset); 
route.post('/PostReset', authen.PostReset);
 route.get('/reset/:token', authen.changePassward);
 route.post('/updatepassword', authen.updatepassword);

module.exports = route