const mongoose = require('mongoose');
require('dotenv').config()

const connection=async()=>{
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongodb is connected successfully!!!");
  } catch (e) {
    console.log(e);
  }
}

 module.exports = connection ;