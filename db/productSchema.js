const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    productName: String,
    iconurl : Number,
    description: String,
    price: Number,
    wash:Number,
    bleach: Number,
    iron:Number,
    towel: Number
});


exports.productSchema = productSchema;