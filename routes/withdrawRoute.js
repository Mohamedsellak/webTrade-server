const express = require("express");
const router = express.Router();
const {
    createWithdraw,
    getWithdraws,
    adminGetAllWithdraws,
    adminUpdateWithdraw,
    adminDeletewithdraw
} = require("../controllers/withdrawController");

// Admin routes
router.get("/admin/withdraw", adminGetAllWithdraws); // Admin route to get all users withdraw
router.put("/admin/withdraw/:withdrawId", adminUpdateWithdraw); // Admin route to update a user withdraw
router.delete("/admin/withdraw/:withdrawId", adminDeletewithdraw); // Admin route to delete a user withdraw

// User routes
router.get("/user/withdraw",getWithdraws ); // User route to get their own withdraw information
router.post("/user/withdraw",createWithdraw); // User route to create a new withdraw


module.exports = router;
