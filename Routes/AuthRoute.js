const { Signup,Login, getProducts, getStores, addStore, addAddress } = require("../Controllers/AuthController");
const router = require("express").Router();
const {userVerification} = require("../Middlewares/AuthMiddleware")

router.post('/',userVerification)
router.post("/signup", Signup);
router.post('/login', Login);
router.get("/products",getProducts);
router.get("/store",getStores);
router.post("/add-store",addStore);
router.post("/add-address",addAddress);

module.exports = router;