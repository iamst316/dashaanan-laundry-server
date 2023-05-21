const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    addresses:[{
        stateName:String,
        district:String,
        pincode:Number,
        address:String,
    }],
    password:String,
    orders: [{
        items: [
            {
                productName: String,
                quantity: Number,
                washType : Array,
                price: Number,
            }
        ],
        orderStatus :String,
        storePhoneNo :String,
        city :String,
        userId: String,
        storeAddress: String,
        billAmt: Number,
        storeLocation: String,
        orderDate: String
    }]
});

exports.userSchema= userSchema;