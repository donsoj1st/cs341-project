const Products = require('../model/productModel');
const { validationResult } = require('express-validator/check');


exports.addNewProduct = (req, res, next) => {
    res.render("pages/addnew", { "title": "book Information", errorMsg: null });
    
};
exports.addProduct = (req, res, next)=>{
    console.log(req.body.name)
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0])
        return res.status(442).render("pages/user", { "title": "book Information", errorMsg: err.array()[0].msg
            , oldInput: {
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                description: req.body.description
            } })
    }
    
    const addNew = new Products({name:req.body.name, price:req.body.price, image:req.body.image, description: req.body.description, user : req.session.user});
    addNew.save().then(result =>{
        console.log(result);
    })
    console.log()
    res.redirect("/shop")

};
exports.modify = (req, res, next) => {
    console.log(req.params.prodID)
    Products.findById(req.params.prodID).then(result =>{
        console.log(result.user,"----", req.user._id)
        if(result.user.toString() !== req.user._id.toString()){
            res.redirect("/shop")
        }else{
            console.log(result)
            res.render("pages/modify", { "title": "modify page", list: result });
        }
       
    }).catch(err => {

        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
    
};
exports.delete = (req, res, next) => {
    console.log(req.params.prodID)
    Products.deleteOne({_id:req.params.prodID, user: req.user._id}).then(()=>{
        console.log("i din do am")
        res.redirect("/shop")
    })
    


};

exports.updated = (req, res, next) => {
    console.log(req.params.prodID)
    Products.findById(req.params.prodID).then(result=>{
        res.render("pages/update", { "title": "modify page", list: result, errorMsg: null})
    }).catch(err => {

        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
   
};
exports.lastUpdate = (req, res, next) => {
    console.log(req.params.prodID)
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err.array()[0])
       
        return res.render("pages/update", {
            "title": "modify page", list: {
                _id: req.params.prodID,
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                description: req.body.description
            }, errorMsg: err.array()[0].msg })
    }


    Products.findById(req.params.prodID).then(result => {
       throw new error('dummy')
        if (result.user.toString() !== req.user._id.toString()) {
        res.redirect("/shop")
    }else{
        result.name = req.body.name
        result.price = req.body.price
        result.image = req.body.image
        result.description = req.body.description
        result.save();
       
        res.redirect('/shop');
    }
   
    }).catch(err=>{
        // return res.status(500).render("pages/update", {
        //     "title": "modify page", list: {
        //         _id: req.params.prodID,
        //         name: req.body.name,
        //         image: req.body.image,
        //         price: req.body.price,
        //         description: req.body.description
        //     }, errorMsg: 'database have issues please try again'
        // })
        // res.redirect("/getDberror")
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
    })

};

exports.getProducts = (req, res, next) => {

    Products.find({user:req.user._id }).then((params) => {
        res.render("pages/adminShop.ejs", { "title": "Welcome to the T cloth collections", list: params });
    }).catch(err => {

        res.redirect("/login")
    })
    console.log("admin")


};

exports.getDberror =(req, res, next) => {
    res.render("pages/errorhandle", { "title": "error page " });
}
// exports.login = (req, res, next) => {
//     req.session.soul = true;
    
//     res.render("pages/userLogin", { "title": "Login page"}) 

// };
