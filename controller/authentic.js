const bcrypt = require('bcryptjs');
const person = require('../model/user');
const nodemailer = require('nodemailer');
const sendMailler= require('nodemailer-sendgrid-transport');
exports.login = (req, res, next) => {
   
    res.render("Authen/userLogin", { "title": "Login page",errorMsg: req.flash('error') })

};
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, '  ',"me" )
    person.findOne({email: email}).then(user => {

       if(!user){
           req.flash('error','invalid email or passward');
           res.redirect('/login')
       }
       bcrypt
       .compare(password,user.password)
       .then(result =>{
           if(result){
               console.log(result)
               req.session.user = user;
               console.log(req.session.user)
               return res.redirect('/shop')
           }
           req.flash('error', 'invalid email or passward')
           res.redirect('/login');
       })
       .catch(err=>{
           console.log(err)
          
           res.redirect('/login')
       })
    })
   
    
};
exports.logout = (req, res, next) => {
  
        req.session.destroy(err=>{
            console.log('session destroy')
            res.redirect('/shop');
        })
        
  
};
exports.signup = (req, res, next) => {

    res.render("authen/signUp", { "title": "signup page", errorMsg: req.flash('error') })
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const Cpassword = req.body.Cpassword;
    console.log(email, "  ", password)
    
    person.findOne({ email: email }).then(result => {
        console.log(result)
        if (result){
            req.flash('error', 'email Already in use')
            return res.redirect('/signup')
        }
        return bcrypt.hash(password, 12).then(result => {
            const user = new person({
                email: email,
                password: result,
                cart: { item: [] }

            });
            return user.save();
        })
            .then(result => {
                res.redirect('/login')
            })
        
        
    }).catch(err=> console.log(err))
};