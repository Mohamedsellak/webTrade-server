const express = require("express");
const router = express.Router();
const {
    getUserInfo,
    updateUserInfo,
    deleteUserAccount
} = require("../../controllers/user/userController");


// User routes
router.get("/", getUserInfo); // User route to get their own profile information
router.put("/:id", updateUserInfo); // User route to update their own profile
router.delete("/:id", deleteUserAccount); // User route to delete their own account

module.exports = router;
