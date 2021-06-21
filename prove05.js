const express = require('express');
const parseBody = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const mongoConnect = require('./Util/database').mongoConnect;
const person = require('./model/user');
const session = require('express-session');
const mongosession = require('connect-mongodb-session')(session);
const app = express();
const csrf = require('csurf');
const flash = require('connect-flash');
const shop = require('./routes/shop.js');
const user = require('./routes/admin');
const userLogin = require('./routes/userauthen');
const mongoose = require('mongoose');
const cProtection = new csrf();
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://donsoj1st:7851AdeSoji@cluster0.2h96s.mongodb.net/myFirstDatabase';
const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const corsOptions = {
    origin: "https://prove2assignment.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};


const sessionStore = new mongosession({
    uri: MONGODB_URL,
    collection: "sessions"
})
app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')))
app.use(parseBody.urlencoded({ extended: false }));
app.use(session({ secret: 'this is my secret', resave: false, saveUninitialized: false, store: sessionStore }));
app.use(cProtection);
app.use(flash());
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    person.findById(req.session.user._id).then(result => {
        
        if (!result) {
            return next();
        }
        console.log(result)
        req.user = result;
        next();
    }).catch(err=>{
        next(new Error(err));
    })

});

app.use("/shop", shop);
app.use(user);
app.use(userLogin);
app.use((req, res, next) => {
    res.render("pages/error", { "title": "error page " });
})

 app.use((error, req, res, next) => {
     res.redirect('/getDberror');
 })







mongoose.connect(MONGODB_URL, options)
    .then(result => {
        app.listen(port);
    }).catch(err => {
        console.log(err);
        console.log("what is this shit")
    })