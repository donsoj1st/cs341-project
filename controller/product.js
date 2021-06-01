const Products = require('../model/productModel');
const Order = require('../model/order');
const { param } = require('../routes/admin');
const order = require('../model/order');
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
        console.log(req.session.user)
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

exports.postOrder= (req,res,next) =>{
    console.log('i got here')
    req.user
        .populate('cart.item.productId')
        .execPopulate().then(result => {
            const list = result.cart.item.map(i =>{
                return {quantity: i.quantity, product: {...i.productId._doc}} 
            })
            console.log(req.session.user)
            
            const order = new Order({
                user:{ email: req.user.emmail,
                userId: req.user},
                product: list
            })
            return order.save();
        }).then(i=>{
            req.user.clearCart();
        })
        .then((i)=>{
            res.redirect('/shop/displayOrder');
        }).catch(err=>console.log(err))
   
}
exports.getOrder = (req, res, next) => {
    Order.find({'user.userId':req.session.user._id})
    .then(order =>{
        
        console.log(order)
        res.render("pages/orderpage.ejs", { "title": "user Cart", list: order })
    }).catch(err=> {console.log(err)})
}



