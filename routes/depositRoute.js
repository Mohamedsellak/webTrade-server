const express = require("express");
const router = express.Router();
const {
    createDeposit,
    getDeposits,
    adminGetAllDeposits,
    adminUpdateDeposit,
    adminDeleteDeposit
} = require("../controllers/depositController");

// Admin routes
router.get("/admin/deposit", adminGetAllDeposits); // Admin route to get all users deposits
router.put("/admin/deposit/:depositId", adminUpdateDeposit); // Admin route to update a user deposit
router.delete("/admin/deposit/:depositId", adminDeleteDeposit); // Admin route to delete a user deposit

// User routes
router.get("/user/deposit", getDeposits); // User route to get their own deposit information
router.post("/user/deposit",createDeposit); // User route to create a new deposit


module.exports = router;
