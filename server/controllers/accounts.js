const express = require('express');
const router = express.Router();

router.get("/helloWorld", (request, response) => {
    return response.status(200).json({
        message: "Hello World"
    })
})


module.exports = router;