const express = require("express");



const route = express.Router()
route.get("/user",(req, res, next)=>{
    res.render("pages/user",{"title":"book Information"});

})

module.exports  = route;