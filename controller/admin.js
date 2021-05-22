const Products = require('../model/productModel');

exports.addNewProduct = (req, res, next) => {
    res.render("pages/user", { "title": "book Information" });
    
};
exports.addProduct = (req, res, next)=>{
    console.log(req.body.name)
    
    
    const addNew = new Products({name:req.body.name, price:req.body.price, image:req.body.image, description: req.body.description, user : req.user});
    addNew.save().then(result =>{
        console.log(result);
    })
    console.log()
    res.redirect("/shop")

};
exports.modify = (req, res, next) => {
    console.log(req.params.prodID)
    Products.findById(req.params.prodID).then(result =>{
        console.log(result)
        res.render("pages/modify", { "title": "modify page", list : result});
    })
    
};
exports.delete = (req, res, next) => {
    console.log(req.params.prodID)
    Products.findByIdAndRemove(req.params.prodID).then(()=>{
        console.log("i din do am")
        res.redirect("/shop")
    })
    


};

exports.updated = (req, res, next) => {
    console.log(req.params.prodID)
    Products.findById(req.params.prodID).then(result=>{
        res.render("pages/update", { "title": "modify page", list: result})
    })
   
};
exports.lastUpdate = (req, res, next) => {
    console.log(req.params.prodID)
    Products.findById(req.params.prodID).then(result => {
        result.name= req.body.name
         result.price= req.body.price 
         result.image =req.body.image 
         result.description = req.body.description
         result.save();
        res.redirect('/shop');
    })

};

