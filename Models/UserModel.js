const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  // phone:{
  //   type:Number,
  //   required: [true, "Your phone number is required"],
  // },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  addresses: [{
    stateName: String,
    city: String,
    address: String,
  }],
  orders: [{
    items: [
      {
        productName: String,
        quantity: Number,
        washType: Array,
        price: Number,
        total: Number
      }
    ],
    deliveryAddress:{
      stateName: String,
      city: String,
      address: String,
    },
    store:{
      address: String,
      delivery_charges: Number,
      label: String,
      storeName: String,
      telephone: Number
    },
    orderStatus: String,
    billAmt: Number,
    orderDate: String
  }]
});

userSchema.pre("save", async function() {
  this.password = bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
