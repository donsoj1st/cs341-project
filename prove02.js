const express = require("express");
const user = require('./routes/user');
const parseBody =require('body-parser');
const display = require("./routes/display");
const { response } = require("express");
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),"data", "product.json")
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const json = [];
const app = express();
app.use(parseBody.urlencoded({extended: false}));
app.set("view engine", "ejs")
app.set('views', 'views');
app.use(user);
app.use(display.router);
// app.post("/json",(req, res, next) => {
//     console.log(req.body);
//     const response = req.body;
//     response.id = Math.random().toString()
//     json.push(req.body);
//     console.log(json);
   
// fs.writeFile(p,asn,(err)=>{
//     console.log('err')
// });

//     res.redirect('pages/dummy');

// })
app.use((req,res,next)=>{
    res.render('pages/dummy', { title: 'Error page not found' });

});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
