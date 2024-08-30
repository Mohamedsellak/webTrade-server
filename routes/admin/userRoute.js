const express = require("express");
const router = express.Router();
const {
    deleteUser,
    getUsers,
    getUser,
    createUser,
    updateUser,
} = require("../../controllers/admin/userController");

// Admin routes
router.get("/", getUsers); // Admin route to get all users
router.get("/:id", getUser); // Admin route to get a specific user by ID
router.post("/", createUser); // Admin route to create a new user
router.put("/:id", updateUser); // Admin route to update a user by ID
router.delete("/:id", deleteUser); // Admin route to delete a user by ID


module.exports = router;
