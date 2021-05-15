const express = require('express');
const parseBody = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000
const list = [];
const app = express();
const shop = require('./routes/shop.js')
const user = require('./routes/admin')
app.set("view engine",'ejs');
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')))
app.use(parseBody.urlencoded({ extended: false }));

app.use("/shop",shop);
app.use(user);
 app.use((req, res, next) => {
     res.render("pages/error", { "title": "error page " });
 })







app.listen(port);