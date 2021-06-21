const bcrypt = require('bcryptjs');
const person = require('../model/user');
const nodemailer = require('nodemailer');
const sendMailler= require('nodemailer-sendgrid-transport');
const Crypto = require('crypto');
const {validationResult } = require('express-validator/check');

const transporter = nodemailer.createTransport(sendMailler({
    auth:{
        api_key:'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'
    }
}))

exports.login = (req, res, next) => {
   
    res.render("authen/userLogin", { "title": "Login page", errorMsg: req.flash('error'), 
oldInput: {
            email: '',
            password: ''
        }})

};
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, '  ',"me" )
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0])
        return res.status(442).render("authen/userLogin", { "title": "Login page", errorMsg: err.array()[0].msg, 
    oldInput: {
        email:email,
        password: password
    } })
    }
    person.findOne({email: email}).then(user => {

       if(!user){
           req.flash('error','invalid email or passward');
           return res.status(442).render("authen/userLogin", {
               "title": "Login page", errorMsg: 'invalid email or passward',
               oldInput: {
                   email: email,
                   password: password
               }
           })
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
           req.flash('error', 'invalid email or passward');
           return res.status(442).render("authen/userLogin", {
               "title": "Login page", errorMsg: 'invalid email or passward',
               oldInput: {
                   email: email,
                   password: password
               }
           })
       })
       .catch(err=>{
           console.log(err)
          
           return res.status(442).render("authen/userLogin", {
               "title": "Login page", errorMsg: 'invalid email or passward',
               oldInput: {
                   email: email,
                   password: password
               }
           })
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

    res.render("authen/signUp", { "title": "signup page", errorMsg: req.flash('error'),
        oldInput: {
            email: '',
            password: '',
            Cpassword: ''
        } })
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const Cpassword = req.body.Cpassword;
    const err = validationResult(req);
    if(!err.isEmpty()){
        console.log(err.array()[0])
        return res.status(442).render("authen/signUp", {
            "title": "signup page", errorMsg: err.array()[0], oldInput: {
                email: email,
                password: password,
                Cpassword: Cpassword
            } })
    }
    bcrypt.hash(password, 12).then(result => {
            const user = new person({
                email: email,
                password: result,
                cart: { item: [] }

            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: "ade18005@byui.edu",
                subject: "sign up successful",
                html: '<h1>you have signed up to our website.</h1>'
            })
               
            })
        
        
    }

exports.reset = (req, res, next) => {
    res.render("authen/reset", { "title": "Reset password", errorMsg: req.flash('error') });

};

exports.PostReset = (req, res, next) => {

    Crypto.randomBytes(32,(err,Buffer)=>{
        if(err){
            console.log(err);
            res.redirect('/reset');
        }
        const token = Buffer.toString('hex');
        person.findOne({ email: req.body.email })
        .then(result =>{
            if(!result){
                req.flash('error','No account found with that email');
                return res.redirect('/reset');
               
            }
            result.resetToken = token;
            result.tokenExpired = Date.now() + 3600000;

            return result.save();
        })
        .then(result=>{
            const port = process.env.PORT || 5000;
            const link ='http://' + port + "/reset/" + token;
            console.log('link')
            transporter.sendMail({
                to: email,
                from: "ade18005@byui.edu",
                subject: "reset password",
                html: `<h1>you have requested a password reset</h1>
                <h1> <a href='${link}'>click here to reset</a></h1>
                `
            })

        })
        .catch(err=>{
            console.log(err);
        })
    })
   
};

exports.changePassward = (req, res, next) => {

    const token = req.params.token;
    person.findOne({
        resetToken: token,
        tokenExpired:{$gt : Date.now()}  })
        .then(result=>{
            console
            res.render("authen/changepassword", 
            { "title": "signup page"
                , errorMsg: req.flash('error')
                , userid: result._id.toString()
                , token })
            
        })
        .catch(err => {
            console.log(err);
        })

   
};

exports.updatepassword = (req, res, next) => {
    //res.render("authen/reset", { "title": "Reset password", errorMsg: req.flash('error') });
     let user;
    const id = req.body.userid;
     person.findOne({
         resetToken: req.body.token,
         tokenExpired: { $gt: Date.now()},
         _id: id 
     }).then(result => {
             user = result;

             return bcrypt.hash(req.body.password,12);

         })
         .then(result => {
             user.password = result;
             user.resetToken= undefined;
             user.tokenExpired = undefined;
             return user.save();
     }).then(result=>{
         res.redirect('/login')
     })
         .catch(err => {
             console.log(err);
         })

};
