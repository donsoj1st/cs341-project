const express = require('express');
const list = []
const router = express.Router();

router.post("/display",(req, res, next)=>{
    console.log(req.body)
    list.push(req.body);
    res.redirect("/display");
})
    router.get("/display",( req, res, next)=>{
        res.render("pages/display",{"title":"display book inf0", list:list});
        list.forEach(list =>{
            console.log(list);
        })
    })
   exports.router = router;
    exports.list = list;