const mongoose = require("mongoose");


let storeSchema = new mongoose.Schema({
    storeName: String,
    label: String,
    address: String,
    telephone: Number
});



exports.storeSchema = storeSchema;