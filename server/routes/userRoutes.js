const router = require("express").Router();
const userController = require('../controllers/Account');
const auth = require('../middelware/auth');


router.get("/get_user", auth, userController.get_user);

router.post("/register", userController.register );

router.post("/login", userController.login);

router.post("/forget_password", userController.forget_password);



module.exports = router;