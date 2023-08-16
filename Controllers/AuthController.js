const User = require("../Models/UserModel");
const productModel = require("../Models/productModel");
const storeModel = require("../Models/storeModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname, address, createdAt, city, state } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const orders = [];
    const name = firstname + " " + lastname;
    const addresses = [
      {
        city: city,
        stateName: state,
        address: address
      }
    ]
    const user = await User.create({ email, password, name, createdAt, orders, addresses });
    const token = createSecretToken(user._id);
    // user.save()
    console.log("USER-->", user);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 30 * 1000,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);
     console.log("to be logged-->",user);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 30 * 1000,
    });
    res.status(201).json({ message: "User logged in successfully", success: true, user: user });
    next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.getProducts = async (req, res, next) => {
  try {
    const list = await productModel.find();
    res
      .status(201)
      .send(list);
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getStores = async (req, res, next) => {
  try {
    const list = await storeModel.find();
    res
      .status(201)
      .send(list);
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.addStore = async (req, res, next) => {
  try {
    const { storeName, label, address, telephone, delivery_charges } = req.body;
    const existingStore = await storeModel.findOne({ storeName });
    if (existingStore) {
      return res.json({ message: "Store already exists" });
    }
    const store = await storeModel.create({ storeName, label, address, telephone, delivery_charges });
    // const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res
      .status(201)
      .json({ message: "store added successfully", success: true, store });
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports.addAddress = async(req,res,next)=>{
  //fetch user logic
  try {
    const {email, address, stateName, city } = req.body;
    const existingAddress = await User.findOne({ address });
    const user = await User.findOne({ email });
    
    if (existingAddress) {
      return res.json({ message: "Address already exists" });
    }
    const newList = user.addresses;

    newList.push({
      address: address,
      stateName: stateName,
      city: city
    })
    
    const update = { $set: { address: existingAddress } };

    const result = await User.updateOne(user, update);
    user.save()

    res
      .status(201)
      .json({ message: "Address Added Successfully", success: true, result });
    next();
  } catch (error) {
    console.error(error);
  } 
}



//64dcae39af2a00b8dcb4cedb