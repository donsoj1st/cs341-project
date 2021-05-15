const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json")
const Products = require('../model/productModel');
let cart
module.exports  = class Cart{
    constructor(id){
        this.id =id
    }
    addcart(){
       fs.readFile(p,(err,data)=>{
           if (err) {
               console.log('err')

               cart = [];
           }
           else{
               cart = [JSON.parse(data)];
               Products.getAllProduct()
               for (let index = 0; index < array.length; index++) {
                   const element = array[index];
                   
               }
           }
       }) 

    }


} ;