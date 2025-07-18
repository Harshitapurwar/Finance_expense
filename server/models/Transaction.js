const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  description: String,
  amount: Number,
  type: { type: String, enum: ['income', 'expense'] },
  category: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
