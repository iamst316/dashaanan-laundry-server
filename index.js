const express = require('express') ;
const mongoose = require("mongoose");
const app = express() ;
require('dotenv').config()
const cors = require('cors');
const jwt = require('jsonwebtoken')
const razorpay = require("razorpay");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

// app.post("/payment", async (req,res)=>{
//     try{
//         const instance = new razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_SECRET,
//         })
//         const options = {
//             amount: 50000,
//             currency: "INR",
//             receipt: "receipt_order_74394",
//         };
//         const order = await instance.orders.create(options);
//
//         if (!order) return res.status(500).send("Some error occured");
//         
//         res.json(order);
//
//     }
//     catch{
//         res.status(500).send(error);
//     }
// })
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
