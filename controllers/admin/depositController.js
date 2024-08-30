const User = require('../../models/userModel');
const fs = require('fs/promises')
const verifyToken = require("../utils/veriftyToken")
const verifyAdmin = require("../utils/verifyAdmin")

////////////////////////////
// Admin Deposit Operations
////////////////////////////

const adminGetAllDeposits = [verifyToken, verifyAdmin, async (req, res) => {
// Get all deposits for all users
    try {
        const users = await User.find({},{_id:1,username:1,email:1,totalBalance:1,deposit:1});
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

            // Extract the deposit and its image path
            const deposit = user.deposit[depositIndex];
            const imagePath = deposit.prove;

            try {
                // Remove the image file
                await fs.access(imagePath); // Check if the file exists
                await fs.unlink(imagePath); // Remove the file
                console.log('Image deleted successfully');
            } catch (err) {
                console.error('Error deleting image:', err);
                // If the file doesn't exist or another error occurred
            }

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
    adminGetAllDeposits,
    adminUpdateDeposit,
    adminDeleteDeposit
};
