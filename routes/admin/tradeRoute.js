const express = require("express");
const router = express.Router();
const {
    adminGetAllTrads,
    adminDeleteTrade
} = require("../../controllers/admin/tradesControler");

// Admin routes
router.get("/", adminGetAllTrads);
router.delete("/:depositId", adminDeleteTrade);

module.exports = router;
