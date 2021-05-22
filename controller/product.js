const Products = require('../model/productModel');
const { param } = require('../routes/admin');
exports.getProducts= (req,res, next)=>{
    
    Products.find().then((params) => {
        res.render("pages/shop.ejs", { "title": "Welcome to the T cloth collections", list: params });
    })
    console.log("ades")

};

exports.getDetails = (req, res, next) => {
    console.log(Products.findById(req.params.productid))
    Products.findById(req.params.productid).then((data) => {
        
        res.render("pages/display.ejs", { "title": "Welcome to the T cloth collections", list: data });
        // console.log(product)

    })
    console.log("ades")

};
exports.addtocat = (req, res, next) => {
    
    Products.findById(req.params.productid).then((data) => {
        return req.user.addTocart(data);
    }).then(data=>{
        console.log(data)
        res.redirect("/shop")
    })
    

};
exports.getCart = (req, res, next) => {

     req.user
     .populate('cart.item.productId')
     .execPopulate().then(result=>{
         console.log(result)
         const list = result.cart.item;
         console.log(list)
         //res.redirect("/shop")
         res.render("pages/displaycart.ejs", { "title": "user Cart", list:list });
     })


};
exports.deleteCart = (req, res, next) => {
    console.log(req.params.delete)
     req.user.delete(req.params.delete).then(result=>{
         res.redirect('/shop');
 })
        
    //res.redirect('/shop');
 
};



