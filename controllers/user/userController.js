const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const verifyToken = require("../utils/veriftyToken")


//////////////////////////////////////////////////////////////
////////////////////////// User /////////////////////////////
////////////////////////////////////////////////////////////

const getUserInfo = [verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id,{password:0});
        if (!user) return res.status(404).json('User not found');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

const updateUserInfo = [verifyToken, async (req, res) => {
    try {
        const updates = {
            username: req.body.username,
            email: req.body.email
        };

        if (req.body.password) {
            updates.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        if (!user) return res.status(404).json('User not found');

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

const deleteUserAccount = [verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) return res.status(404).json('User not found' );

        res.json({ message: 'User account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

module.exports = {
    getUserInfo,
    updateUserInfo,
    deleteUserAccount
};
