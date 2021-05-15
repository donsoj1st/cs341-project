const Products = require('../model/productModel');

exports.addNewProduct = (req, res, next) => {
    res.render("pages/user", { "title": "book Information" });
    
};
exports.addProduct = (req, res, next)=>{
    console.log(req.body.name)
    
    const product = {} 
     product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
     product.description = req.body.description;
    product.id = Math.random().toString();
    const addNew = new Products(req.body.name, req.body.price, req.body.image, req.body.description, Math.random().toString());
    addNew.save();
    console.log(product)
    res.redirect("/shop")

};

