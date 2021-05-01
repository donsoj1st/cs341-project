const express = require("express");
const user = require('./routes/user');
const parseBody =require('body-parser');
const display = require("./routes/display");
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();
app.use(parseBody.urlencoded({extended: false}));
app.set("view engine", "ejs")
app.set('views', 'views');
app.use(user);
app.use(display.router);
app.use((req,res,next)=>{
    res.render('pages/error', { title: 'Error page not found' });

});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
