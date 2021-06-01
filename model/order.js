const mongoose = require('mongoose');

const schema = mongoose.Schema;

const OrderSchema = new schema({
     product: [{
         product : {type: Object, require : true},
         quantity:{type : Number, require : true}
     }],
     user: { 
        email: {type:String, require: true},
     userId: { type: schema.Types.ObjectId, required: true, ref: "User"}
     }
});

module.exports = mongoose.model("Order",OrderSchema); 