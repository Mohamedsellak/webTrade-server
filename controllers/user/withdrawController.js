const User = require("../../models/userModel");
const verifyToken = require("../utils/veriftyToken")

// User withdraw Operations

// Create a withdraw
const createWithdraw = [verifyToken, async (req, res) => {
    try {
        const { amount, walletAddress} = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json('User not found');

        if(user.totalBalance < amount) return  res.status(400).json('not Enough balance !!!');

        const newWithdraw = { amount, walletAddress };
        user.withdraw.push(newWithdraw);
        await user.save();

        res.status(201).json(newWithdraw);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

// Get all withdraws for the authenticated user
const getWithdraws = [verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json('User not found' );

        res.status(200).json(user.withdraw);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


module.exports = {
    createWithdraw,
    getWithdraws
};
