const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
  name: { type: String, default: '' },
  address: { type: String,required: true }
});

module.exports = mongoose.model("wallets",walletSchema);