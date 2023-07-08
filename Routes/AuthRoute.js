const { Signup,Login, getProducts, getStores } = require("../Controllers/AuthController");
const router = require("express").Router();
const {userVerification} = require("../Middlewares/AuthMiddleware")

router.post('/',userVerification)
router.post("/signup", Signup);
router.post('/login', Login);
router.get("/products",getProducts);
router.get("/store",getStores);

module.exports = router;