const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  codeName: {
    type: String,
    required: [true, "Your Code Name is Required"],
    unique: true
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
  
});

adminSchema.pre("save", async function() {
  this.password = bcrypt.hash(this.password, 12);
  
});

module.exports = mongoose.model("Admin", adminSchema);
