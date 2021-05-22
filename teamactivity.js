const express = require('express');
const parseBody = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const session = require('express-session');
const mongoConnect = require('./Util/database').mongoConnect;

const app = express();

app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')))
app.use(parseBody.urlencoded({ extended: false }));




app.use(session({ secret: 'hdgakak', resave: false, saveUninitialized: false}))


app.get('/team',(req,res, next)=>{
    if (req.session.counter === undefined) {
        req.session.counter = 0;
    }
    if (req.session.style === undefined) {
        req.session.style = 'white';
    }
    
    res.render('pages/team', {
        title: 'Team Activity 05',
        path: '/team',
        style: req.session.style,
        counter: req.session.counter,
        
        
    });

})
app.get('/change-style', (req, res, next) => {
    req.session.style = "black"; 
    res.render('pages/team', {
        title: 'Team Activity 05',
        path: '/ta05',
        style: req.session.style,
        counter: req.session.counter,
       
    });
})

app.get('/counter', (req, res, next) => {
    if (req.query.action === "increment") {
        console.log(req.session.counter)
        req.session.counter++;
    }else
    req.session.counter--;
    console.log(req.session.counter);
    res.render('pages/team', {
        title: 'Team Activity 05',
        path: '/team',
        style: req.session.style,
        counter: req.session.counter
    });
})

app.get('/destroy',( req, res, next) => {
    
        req.session.destroy(() => {
            res.redirect('/team', {
                title: 'Team Activity 05',
                path: '/team',
                style: req.session.style,
                counter: req.session.counter
            })})
        })
app.use((req, res, next) => {
    res.render("pages/error", { "title": "error page " });
})


    app.listen(port);

