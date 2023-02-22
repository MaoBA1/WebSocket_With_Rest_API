const router = require("express").Router();
const userController = require('../controllers/Account');

router.post("/register", userController.register );

router.post("/login", userController.login);

router.post("/forget_password", userController.forget_password);

module.exports = router;