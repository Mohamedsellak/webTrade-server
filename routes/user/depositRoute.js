const express = require("express");
const router = express.Router();
const {
    createDeposit,
    getDeposits,
} = require("../../controllers/user/depositController");


// User routes
router.get("/", getDeposits);
router.post("/", createDeposit); // Use the updated controller with file handling

module.exports = router;
