const express = require("express");
const router = express.Router();
const {
    adminGetAllDeposits,
    adminUpdateDeposit,
    adminDeleteDeposit
} = require("../../controllers/admin/depositController");

// Admin routes
router.get("/", adminGetAllDeposits);
router.put("/:depositId", adminUpdateDeposit);
router.delete("/:depositId", adminDeleteDeposit);

module.exports = router;
