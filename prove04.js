const express = require('express');
const parseBody = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const mongoConnect = require('./Util/database').mongoConnect;
const person = require('./model/user');
const list = [];
const app = express();
const shop = require('./routes/shop.js')
const user = require('./routes/admin')
const mongoose = require('mongoose');
app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')))
app.use(parseBody.urlencoded({ extended: false }));
app.use((req, res, next) => {
    person.findById('60a90fc81e0f7a12dcca815f').then(result => {
        req.user = result;
        next();
    })
})
app.use("/shop", shop);
app.use(user);
app.use((req, res, next) => {
    res.render("pages/error", { "title": "error page " });
})


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

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://donsoj1st:7851AdeSoji@cluster0.2h96s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';





mongoose.connect(MONGODB_URL, options)
    .then(result => {
        person.findOne().then(user => {
            if (!user) {
                const users = new person({
                    username: "ade",
                    email: "ade.com",
                    cart: {
                        item: []
                    }

                })
                users.save();
            }
        })

        app.listen(port);
    }).catch(err => {
        console.log(err);
        console.log("what is this shit")
    })