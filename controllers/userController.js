const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const verifyToken = require("./utils/veriftyToken")
const verifyAdmin = require("./utils/verifyAdmin")



//////////////////////////////////////////////////////////////
////////////////////////// Admin ////////////////////////////
////////////////////////////////////////////////////////////

const getUsers = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) return res.status(404).json({ message: 'No users found' });
        res.status(200).json(users);
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
            name: req.body.name,
            email: req.body.email,
            verified: req.body.verified,
            status: req.body.status,
            totalBalance: req.body.totalBalance
        };

        if (req.body.password) {
            updates.password = await bcrypt.hash(req.body.password, 10);
        }

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
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

//////////////////////////////////////////////////////////////
////////////////////////// User /////////////////////////////
////////////////////////////////////////////////////////////

const getUserInfo = [verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

const updateUserInfo = [verifyToken, async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            email: req.body.email
        };

        if (req.body.password) {
            updates.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

const deleteUserAccount = [verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserInfo,
    updateUserInfo,
    deleteUserAccount
};
