const express = require('express');
const router = express.Router();

const { 
    getWallets, 
    getWallet, 
    createWallet, 
    updateWallet ,
    deleteWallet
} = require('../controllers/walletController');

router.get('/', getWallets);
router.get('/:id',getWallet);
router.post('/',createWallet);
router.put('/:id',updateWallet);
router.delete('/:id',deleteWallet);

module.exports = router;  //export the router to use in other files.  //export the