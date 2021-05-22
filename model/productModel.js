const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
    type: String,
    require: true
},
    description: {
    type: String,
    require: true
},
user: {
    type: schema.Types.ObjectId,
    ref: "users"
}
})

module.exports = mongoose.model('products', productSchema )






// const fs = require('fs');
// const path = require('path');
// const p = path.join(path.dirname(process.mainModule.filename), "data", "product.json");
// const getDb = require('../Util/database').getDb;
// const mongo = require('mongodb');




//  module.exports = class product{
//      constructor(name, price, image, description){
//          this.name= name;
//          this.image = image;
//          this.price = price;
//          this.description = description;
         
//      }
//     save(){
//         const Db = getDb();
//         return Db.collection('products').insertOne(this).then(result =>{
//            console.log(result);
//        }).catch(err => {
//            console.log(err);
//        })
//         //  fs.readFile(p,(err,data)=>{
//         //      if (!err) {
//         //          products = JSON.parse(data);
                
//         //      }
//         //      products.push(this);
//         //      console.log(products);
//         //      fs.writeFile(p, JSON.stringify(products), (err) => {
//         //          console.log('err')
//         //      })
//         //  })
//      }
//      static getAllProduct(){
//          const Db = getDb();
//          return Db.collection('products').find().toArray()
//              .then(result => {
//                  console.log(result)
//                  return result;
//                 })
//          .catch((err)=>{
//              console.log(err);
//          })
//         //  console.log('me')
//         //  fs.readFile(p, (err, data) => {
//         //      if (!err) {
//         //          callback(JSON.parse(data));
                 
//         //      }
//         //     })
//      }
//      static delete(prodId){
        
//      }
//  };