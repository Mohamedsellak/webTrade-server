const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../../models/userModel');
const verifyToken = require("../utils/veriftyToken")


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '..','..','public');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

// User Deposit Operations

// Create a deposit
const createDeposit = [verifyToken, upload.single('proofImage'), async (req, res) => {
    try {
      const { amount } = req.body;
      const prove = req.file ? req.file.path : '';
  
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


module.exports = {
    createDeposit,
    getDeposits
};
