const verifyToken = require("../utils/veriftyToken")

// Create a deposit
const createTrade = [verifyToken, async (req, res) => {
    // try {
    //   const { amount } = req.body;
  
    //   const user = await User.findById(req.user._id);
    //   if (!user) return res.status(404).json('User not found');
  
    //   const newDeposit = { amount, prove };
    //   user.deposit.push(newDeposit);
    //   await user.save();
  
    //   res.status(201).json(newDeposit);
    // } catch (err) {
    //   res.status(500).json({ message: err.message });
    // }
  }];

// Get all deposits for the authenticated user
const getTrads = [verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json('User not found' );

        res.status(200).json(user.trads);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}];


module.exports = {
    createTrade,
    getTrads
};
