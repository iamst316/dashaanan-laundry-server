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
    orderStatus: String,
    storePhoneNo: String,
    city: String,
    userId: String,
    storeAddress: String,
    billAmt: Number,
    storeLocation: String,
    orderDate: String
  }]
});

userSchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 12);
  // this.addresses = await [];
  // this.orders = await [];
});

module.exports = mongoose.model("User", userSchema);
