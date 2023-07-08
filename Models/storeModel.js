const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    storeName: {
        type:String,
        required: [true, "Store name is required"],
        unique:true,
    },
    label: {
        type:String,
        required: [true, "Store label is required"],
        unique:true,
    },
    address: {
        type:String,
        required: [true, "Store address is required"],
        unique:true,
    },
    telephone: {
        type:Number,
        required: [true, "Store telephone number is required"],
        unique:true,
    },
    delivery_charges: {
        type:Number,
        required: [true, "Delivery charges is required"],
    },
});


module.exports = mongoose.model("Store", storeSchema);