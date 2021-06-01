const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    username : {
        type: String,
       
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart :
     { item:[
         {
             productId:{type: schema.Types.ObjectId, ref :"products", required: true }, 
             quantity:{type:Number, required: true }
    }
    ]
     }
});
userSchema.methods.addTocart = function (product) {
    const productIndex = this.cart.item.findIndex(result =>{
        return result.productId.toString() === product._id.toString();
    })

    let newQuantity = 1;
    const updateItem = [...this.cart.item];
    if(productIndex >= 0){
        newQuantity = this.cart.item[productIndex].quantity + 1;
        updateItem[productIndex].quantity = newQuantity;
    }else{
        updateItem.push({productId: product._id, quantity: 1})
    }

    const updatedCart ={
        item: updateItem
    }
    this.cart = updatedCart
    return this.save();
}
userSchema.methods.delete = function (product){
    const updatecart = this.cart.item.filter(item=>{
        console.log(item.productId.toString())
        return item.productId.toString() !== product.toString();
    })
    this.cart.item = updatecart;
    return this.save();
}
userSchema.methods.clearCart = function (params) {
    this.cart = {item:[]};
    return this.save();
    
};
module.exports = mongoose.model('users',userSchema)


// const getDb = require('../Util/database').getDb;
// const mongo = require('mongodb');

// module.exports= class user{
//     constructor(username, email){
//         this.username = username;
//         this.email = email;
//     }
//     save(){
//         const db = getDb();
//         return Db.collection('users').insertOne(this);
//     }
//     static findUser(userId){
//         const Db = getDb()
//         return Db.collection('users')
//         .findOne({ _id: new mongo.ObjectId(userId) });
//     }
// }