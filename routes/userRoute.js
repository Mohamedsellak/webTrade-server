const express = require("express");
const router = express.Router();
const {deleteUser,getUsers} = require("../controllers/userController");

router.get("/", getUsers);
router.delete("/:id", deleteUser);


module.exports = router;