const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    storeName: String,
    label: String,
    address: String,
    telephone: Number,
    delivery_charges: Number
});


module.exports = mongoose.model("Store", storeSchema);