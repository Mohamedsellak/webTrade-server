const express = require("express");
const router = express.Router();
const {
    createWithdraw,
    getWithdraws,
} = require("../../controllers/user/withdrawController");


// User routes
router.get("/",getWithdraws ); // User route to get their own withdraw information
router.post("/",createWithdraw); // User route to create a new withdraw


module.exports = router;
