const express = require('express') ;
const mongoose = require("mongoose");
// const connection = require('./db/connection');
// const {products} = require('./db/products');
// const {productSchema} = require('./db/productSchema');
// const {stores} = require("./db/stores");
// const {storeSchema} = require("./db/storeSchema");
const app = express() ;
require('dotenv').config()
const cors = require('cors');
const jwt = require('jsonwebtoken')
const razorpay = require("razorpay");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;
// const { userSchema } = require('./db/userSchema');
// connection();
// const Port = 5000;
// const secretkey = process.env.SECRET_KEY;
// app.use(express.json());
// let storeModel = mongoose.model("stores",storeSchema);
// let productModel = mongoose.model("products",productSchema);
// let userModel = mongoose.model("users",userSchema);

//------------------------------------------------
// const add = async () => {
// 	await productModel.deleteMany({});
// 	await productModel.insertMany(products);
//     await storeModel.deleteMany({});
// 	await storeModel.insertMany(stores);
// 	console.log("added");
// };

// add();
//------------------------------------------------

app.get("/store",async (req,res)=>{
    const list = await storeModel.find();
    res.send(list);
});

app.get("/products",async (req,res)=>{
    const list = await productModel.find();
    // console.log("length--->",list.length)
    res.send(list);
});
//------------------------------------------------

app.post("/register",async(req,res)=>{
    const user = await userModel.find({email:req.body.email})
    if (user.length==1){
        console.log("User Exists",user)

    }
    else{
        // console.log(req.body)
        let newuser= new userModel(req.body);
        newuser.name = req.body.firstname+" "+req.body.lastname;
        newuser.addresses = [
            ...newuser.addresses,
            {
                stateName:req.body.state,
                city:req.body.city,
                address:req.body.address,
            }
        ]
        newuser.save()
        console.log("User Registered")
    }
})
//----------------------------------------------------
app.post("/login",async(req,res)=>{
    const user = await userModel.find({email:req.body.email})

    jwt.sign({user},secretkey,{expiresIn:'1h'},(err,token)=>{
        console.log("token-->",token)
        res.json({token})
    })
})
//----------------------------------------------------
app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretkey,(err,authData)=>{
        if (err) res.send("TOKEN INVALID");
        else{
            // console.log(req.token);
            res.send({authData})
        }
    })
})
//---------------------------------------------------
function verifyToken(req,res,next){
    const bearerHeader = req.header('Authorization');
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else{
        res.send("Token INVALID");
    }
}
//------------------------------------------------

app.post("/payment", async (req,res)=>{
    try{
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        })
        const options = {
            amount: 50000,
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");
        
        res.json(order);

    }
    catch{
        res.status(500).send(error);
    }
})
//------------------------------------------------
// app.listen(Port,()=>{
//     console.log("Server Running at Port ",Port);
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
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);