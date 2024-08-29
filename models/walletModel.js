const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
  type: { type: String, default: '' },
  address: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

module.exports = mongoose.model("wallets",walletSchema);