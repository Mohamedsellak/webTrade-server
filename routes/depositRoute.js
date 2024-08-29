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
router.get("/admin/deposit", adminGetAllDeposits);
router.put("/admin/deposit/:depositId", adminUpdateDeposit);
router.delete("/admin/deposit/:depositId", adminDeleteDeposit);

// User routes
router.get("/user/deposit", getDeposits);
router.post("/user/deposit", createDeposit); // Use the updated controller with file handling

module.exports = router;
