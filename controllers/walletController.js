const Wallet = require('../models/walletModel');
const verifyToken = require('./utils/veriftyToken');
const verifyAdmin = require('./utils/verifyAdmin');

// Get all wallets (protected by verifyToken)
const getWallets = [verifyToken, async (req, res) => {
    try {
        const wallets = await Wallet.find();
        res.status(200).json(wallets);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}];

// Get a specific wallet (protected by verifyToken and admin access)
const getWallet = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.id);
        if (!wallet) return res.status(404).json('Wallet not found');
        res.status(200).json(wallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}];

// Create a new wallet (protected by verifyToken and admin access)
const createWallet = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const wallet = new Wallet({
            type: req.body.type,
            address: req.body.address,
        });
        const savedWallet = await wallet.save();
        res.status(201).json(savedWallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}];

// Update an existing wallet (protected by verifyToken and admin access)
const updateWallet = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const updatedWallet = await Wallet.findByIdAndUpdate(req.params.id, {
            type: req.body.type,
            address: req.body.address,
        }, { new: true });

        if (!updatedWallet) return res.status(404).json('Wallet not found');

        res.status(200).json(updatedWallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}];

// Delete a wallet (protected by verifyToken and admin access)
const deleteWallet = [verifyToken, verifyAdmin, async (req, res) => {
    try {
        const wallet = await Wallet.findByIdAndDelete(req.params.id);
        if (!wallet) return res.status(404).json('Wallet not found' );
        res.status(200).json('Wallet deleted successfully');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}];

module.exports = {
    getWallets,
    getWallet,
    createWallet,
    updateWallet,
    deleteWallet
};
