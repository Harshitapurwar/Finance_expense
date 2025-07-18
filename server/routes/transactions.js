const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { type, amount, category, date, description, source } = req.body;
  const transaction = new Transaction({
    userId: req.user.userId,
    type, amount, category, date, description, source
  });
  await transaction.save();
  res.status(201).json(transaction);
});
router.get('/', authMiddleware, async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = { user: req.user.id };

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const transactions = await Transaction.find(filter).sort({ date: -1 });
  res.json(transactions);
});

// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });
//     return res.json(transactions);
//   } catch (err) {
//     console.error('Error in GET /transactions:', err);
//     return res.status(500).json({ error: 'Server error: ' + err.message });
//   }
// });


router.get('/summary/category', async (req, res) => {
  const userId = req.user.userId;

  const summary = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'expense' } },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' }
      }
    }
  ]);

  res.json(summary);
});


module.exports = router;
