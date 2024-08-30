const express = require("express");
const router = express.Router();
const {
    adminGetAllWithdraws,
    adminUpdateWithdraw,
    adminDeletewithdraw
} = require("../../controllers/admin/withdrawController");

// Admin routes
router.get("/", adminGetAllWithdraws); // Admin route to get all users withdraw
router.put("/:withdrawId", adminUpdateWithdraw); // Admin route to update a user withdraw
router.delete("/:withdrawId", adminDeletewithdraw); // Admin route to delete a user withdraw


module.exports = router;
