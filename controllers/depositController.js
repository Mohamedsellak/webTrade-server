const User = require("../models/userModel");
const verifyToken = require("./utils/veriftyToken")
const verifyAdmin = require("./utils/verifyAdmin")

// User Deposit Operations

// Create a deposit
const createDeposit = [verifyToken, async (req, res) => {
    try {
        const { amount, prove} = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json('User not found');

        const newDeposit = { amount, prove };
        user.deposit.push(newDeposit);
        await user.save();

        res.status(201).json(newDeposit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

// Get all deposits for the authenticated user
const getDeposits = [verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json('User not found' );

        res.status(200).json(user.deposit);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


////////////////////////////
// Admin Deposit Operations
////////////////////////////

const adminGetAllDeposits = [verifyToken, verifyAdmin, async (req, res) => {
// Get all deposits for all users
    try {
        const users = await User.find({},{_id:1,username:1,email:1,deposit:1});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

// Update a specific deposit for any user
const adminUpdateDeposit = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { depositId } = req.params;
        const { status, userId } = req.body;

        // Find the user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find the deposit
        const deposit = user.deposit.id(depositId);
        console.log(depositId)
        if (!deposit) return res.status(404).json({ message: 'Deposit not found' });

        // Update deposit status and total balance if approved
        deposit.status = status;
        if (status === 'approved') {
            user.totalBalance += deposit.amount;
        }

        // Save user document with updated deposit
        await user.save();

        res.status(200).json({
            message: 'Deposit updated successfully',
            deposit,
            totalBalance: user.totalBalance
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


// Delete a specific deposit for any user
const adminDeleteDeposit = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { depositId } = req.params; 
        const { userId } = req.body; 

        // Find the user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find and remove the deposit
        const depositIndex = user.deposit.findIndex(deposit => deposit._id.toString() === depositId);
        if (depositIndex === -1) return res.status(404).json({ message: 'Deposit not found' });

        // Remove the deposit from the array
        user.deposit.splice(depositIndex, 1);

        // Save the updated user document
        await user.save();

        res.json({ message: 'Deposit deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


module.exports = {
    createDeposit,
    getDeposits,
    adminGetAllDeposits,
    adminUpdateDeposit,
    adminDeleteDeposit
};
