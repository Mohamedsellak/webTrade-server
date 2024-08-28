const express = require("express");
const router = express.Router();
const {
    deleteUser,
    getUsers,
    getUser,
    updateUser,
    getUserInfo,
    updateUserInfo,
    deleteUserAccount
} = require("../controllers/userController");

// Admin routes
router.get("/admin/users", getUsers); // Admin route to get all users
router.get("/admin/users/:id", getUser); // Admin route to get a specific user by ID
router.put("/admin/users/:id", updateUser); // Admin route to update a user by ID
router.delete("/admin/users/:id", deleteUser); // Admin route to delete a user by ID

// User routes
router.get("/user/profile", getUserInfo); // User route to get their own profile information
router.put("/user/profile/:id", updateUserInfo); // User route to update their own profile
router.delete("/user/profile/:id", deleteUserAccount); // User route to delete their own account

module.exports = router;
