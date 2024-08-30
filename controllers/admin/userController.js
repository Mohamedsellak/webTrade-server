const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const verifyToken = require("../utils/veriftyToken")
const verifyAdmin = require("../utils/verifyAdmin")



//////////////////////////////////////////////////////////////
////////////////////////// Admin ////////////////////////////
////////////////////////////////////////////////////////////

const getUsers = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({role:"user"});
        if (!users.length) return res.status(404).json({ message: 'No users found' });
        res.status(200).json(users);
    } catch (err) {1000
        res.status(500).json({ message: err.message });
    }
}];

// Create a new user (admin only)
const createUser = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { username, email, password, verified, status, totalBalance } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json('User already exists');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verified,
            status,
            totalBalance
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


const getUser = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

const updateUser = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const updates = {
            username: req.body.username,
            email: req.body.email,
            verified: req.body.verified,
            status: req.body.status,
            totalBalance: req.body.totalBalance
        };

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

const deleteUser = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json('User not found');

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
