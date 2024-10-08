const User = require("../../models/userModel");
const verifyToken = require("../utils/veriftyToken")
const verifyAdmin = require("../utils/verifyAdmin")

////////////////////////////
// Admin withdraw Operations
////////////////////////////

const adminGetAllWithdraws = [verifyToken, verifyAdmin, async (req, res) => {
// Get all withdraws for all users
    try {
        const users = await User.find({},{_id:1,username:1,email:1,totalBalance:1,withdraw:1});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];

// Update a specific withdraw for any user
const adminUpdateWithdraw = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { withdrawId } = req.params;
        const { status, userId } = req.body;

        // Find the user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find the withdraw
        const withdraw = user.withdraw.id(withdrawId);

        if (!withdraw) return res.status(404).json({ message: 'withdraw not found' });

        // Update withdraw status and total balance if approved
        withdraw.status = status;
        if (status === 'approved') {
            user.totalBalance -= withdraw.amount;
        }

        // Save user document with updated withdraw
        await user.save();

        res.status(200).json({
            message: 'withdraw updated successfully',
            withdraw,
            totalBalance: user.totalBalance
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


// Delete a specific withdraw for any user
const adminDeletewithdraw = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { withdrawId } = req.params; 
        const { userId } = req.body; 

        // Find the user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find and remove the withdraw
        const withdrawIndex = user.withdraw.findIndex(withdraw => withdraw._id.toString() === withdrawId);
        if (withdrawIndex === -1) return res.status(404).json({ message: 'withdraw not found' });

        // Remove the withdraw from the array
        user.withdraw.splice(withdrawIndex, 1);

        // Save the updated user document
        await user.save();

        res.json({ message: 'withdraw deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


module.exports = {
    adminGetAllWithdraws,
    adminUpdateWithdraw,
    adminDeletewithdraw
};
