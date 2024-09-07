const User = require('../../models/userModel');
const fs = require('fs/promises')
const verifyToken = require("../utils/veriftyToken")
const verifyAdmin = require("../utils/verifyAdmin")

////////////////////////////
// Admin trade Operations
////////////////////////////

const adminGetAllTrads = [verifyToken, verifyAdmin, async (req, res) => {
// Get all trades for all users
    try {
        const users = await User.find({role:"user"},{_id:1,username:1,email:1,totalBalance:1,trads:1});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];



// Delete a specific trade for any user
    const adminDeleteTrade = [verifyToken, verifyAdmin, async (req, res) => {
        try {
            const { tradeId } = req.params; 
            const { userId } = req.body; 

            // Find the user
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Find and remove the trade
            const tradeIndex = user.trads.findIndex(trade => trade._id.toString() === tradeId);
            if (tradeIndex === -1) return res.status(404).json({ message: 'trade not found' });

            // Remove the trade from the array
            user.trads.splice(tradeIndex, 1);

            // Save the updated user document
            await user.save();

            res.json({ message: 'trade deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }];


module.exports = {
    adminGetAllTrads,
    adminDeleteTrade
};
