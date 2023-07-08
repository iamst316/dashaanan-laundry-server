const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Product", productSchema);