const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), "data", "product.json")



let products = []
 module.exports = class product{
     constructor(name, price, image, description,id){
         this.name= name;
         this.image = image;
         this.price = price;
         this.description = description;
         this.id = id;
     }
    save(){
         fs.readFile(p,(err,data)=>{
             if (!err) {
                 products = JSON.parse(data);
                
             }
             products.push(this);
             console.log(products);
             fs.writeFile(p, JSON.stringify(products), (err) => {
                 console.log('err')
             })
         })
     }
     static getAllProduct(callback){
         console.log('me')
         fs.readFile(p, (err, data) => {
             if (!err) {
                 callback(JSON.parse(data));
                 
             }
            })
     }
 };