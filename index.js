const express = require('express') ;
const mongoose = require("mongoose");
const connection = require('./db/connection');
const {products} = require('./db/products');
const {productSchema} = require('./db/productSchema');
const {stores} = require("./db/stores");
const {storeSchema} = require("./db/storeSchema");
const app = express() ;
require('dotenv').config()
const cors = require('cors');
const jwt = require('jsonwebtoken')
const { userSchema } = require('./db/userSchema');
connection();
const Port = 5000;
const secretkey = process.env.SECRET_KEY;
app.use(express.json());
let storeModel = mongoose.model("stores",storeSchema);
let productModel = mongoose.model("products",productSchema);
let userModel = mongoose.model("users",userSchema);
app.use(cors());
//------------------------------------------------
const add = async () => {
	await productModel.deleteMany({});
	await productModel.insertMany(products);
    await storeModel.deleteMany({});
	await storeModel.insertMany(stores);
	console.log("added");
};

add();
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
app.listen(Port,()=>{
    console.log("Server Running at Port ",Port);
})