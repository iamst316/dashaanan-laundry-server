const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    productName: String,
    iconurl : Number,
    description: String,
    price: Number,
    
    addOn: [
        {
            type: String,
            price: Number,
            status: Boolean
        }
    ],
    
},{ typeKey: '$type' });


exports.productSchema = productSchema;