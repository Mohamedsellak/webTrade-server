const mongoose = require('mongoose');
const { Schema } = mongoose;

const depositSchema = new Schema({
  amount: { type: Number, required: true },
  prove: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

const withdrawSchema = new Schema({
  amount: { type: Number, required: true },
  walletAddress: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

const tradsSchema = new Schema({
  market: { type: String, required: true },
  timeFrame: { type: String, required: true },
  amount: { type: Number, required: true },
  profitRate: { type: Number, required: true },
  status: { type: String, enum: ['win', 'loss'], required: true },
  date: { type: Date, default: Date.now },
});

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ['win', 'loss'], default:"win" },
    totalBalance: { type: Number, default:0 },
    role: { type: String, enum: ['admin','subAdmin', 'user'], default: 'user' },
    deposit: [depositSchema],
    withdraw: [withdrawSchema],
    trads: [tradsSchema],
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
