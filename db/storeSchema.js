const mongoose = require("mongoose");


let storeSchema = new mongoose.Schema({
    storeName: String,
    label: String,
    address: String,
    telephone: Number,
    delivery_charges: Number
});



exports.storeSchema = storeSchema;