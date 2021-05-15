const Products = require('../model/productModel');
const { param } = require('../routes/admin');
exports.getProducts= (req,res, next)=>{
    
    Products.getAllProduct((params) => {
        
        res.render("pages/shop.ejs", { "title": "Welcome to the T cloth collections",list:params });
    })
    console.log("ades")

};

exports.getDetails = (req, res, next) => {

    Products.getAllProduct((data) => {
        const product = data.find(x => x.id === req.params.productid);
        res.render("pages/display.ejs", { "title": "Welcome to the T cloth collections", list: product });
        console.log(product)
        
    })
    console.log("ades")

};