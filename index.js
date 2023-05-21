const express = require('express') ;
const mongoose = require("mongoose");
const connection = require('./db/connection');
const {products} = require('./db/products');
const {productSchema} = require('./db/productSchema');
const {stores} = require("./db/stores");
const {storeSchema} = require("./db/storeSchema");
const app = express() ;
const cors = require('cors');
connection();
const Port = 5000;
app.use(express.json());
let storeModel = mongoose.model("stores",storeSchema);
let productModel = mongoose.model("products",productSchema);
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
    res.send(list);
});
//------------------------------------------------

app.listen(Port,()=>{
    console.log("Server Running at Port ",Port);
})