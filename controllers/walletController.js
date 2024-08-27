const Wallet = require('../models/walletModel');

const getWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find();
        res.status(200).json(wallets);
    } catch (err) {
        res.status(400).json(err.message)
    }
}

const getWallet = async (req, res) => {
    token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if (req.user.role == "admin") {
            const wallet = await Wallet.findById(req.params.id);
            res.status(200).json(wallet);
        }else{
            res.status(401).send('Access Denied !!! ')
        }
        
    } catch (err) {
        res.status(400).json(err.message)
    }
}

const createWallet = async (req, res) => {
    token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if (req.user.role == "admin") {
            const wallet = new Wallet({
                type: req.body.type,
                adress: req.body.adress,
            });
            const savedWallet = await wallet.save();
            res.status(200).json(savedWallet);
        }else{
            res.status(401).send('Access Denied !!! ')
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}

const updateWallet = async (req, res) => {
    token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if (req.user.role == "admin") {
            const updatedWallet = await Wallet.findByIdAndUpdate(req.params.id, {
                type: req.body.type,
                adress: req.body.adress,
            }, { new: true });
            res.status(200).json(updatedWallet);
        }else{
            res.status(401).send('Access Denied !!! ')
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}

const deleteWallet = async (req, res) => {

    token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if (req.user.role == "admin") {
            const wallet = await Wallet.findByIdAndDelete(req.params.id);
            res.json(wallet);
        }else{
            res.status(401).send('Access Denied !!! ')
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}

module.exports = {
    getWallets,
    getWallet,
    createWallet,
    updateWallet,
    deleteWallet
}