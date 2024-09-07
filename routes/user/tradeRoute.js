const express = require("express");
const router = express.Router();
const {
    getTrads,
    createTrade,
} = require("../../controllers/user/tradesControler");


// User routes
router.get("/", getTrads);
router.post("/", createTrade);

module.exports = router;
