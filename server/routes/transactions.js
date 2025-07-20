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

// routes/transactions.js
router.get('/', authMiddleware, async (req, res) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;
  const filter = { user: req.user.id };

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const totalCount = await Transaction.countDocuments(filter);
  const totalPages = Math.ceil(totalCount / parseInt(limit));

  const transactions = await Transaction.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.json({ transactions, totalPages });
});

// router.get('/', authMiddleware, async (req, res) => {
//   const { startDate, endDate } = req.query;
//   const filter = { user: req.user.id };

//   if (startDate && endDate) {
//     filter.date = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate)
//     };
//   }

//   const transactions = await Transaction.find(filter).sort({ date: -1 });
//   res.json(transactions);
// });


// Delete transaction
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update transaction
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Transaction not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

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
// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const Transaction = require('../models/Transaction');
// const authMiddleware = require('../middleware/authMiddleware');

// router.use(authMiddleware);

// // ✅ Create transaction
// router.post('/', async (req, res) => {
//   try {
//     const { type, amount, category, date, description, source } = req.body;

//     const transaction = new Transaction({
//       userId: req.user.userId, // use consistently
//       type:'expense',
//       amount,
//       category,
//       date,
//       description,
//     });

//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (error) {
//     console.error("Create transaction failed:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Get transactions (with optional date filter)
// router.get('/', async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const filter = { userId: req.user.userId }; // consistent key

//     if (startDate && endDate) {
//       filter.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }

//     const transactions = await Transaction.find(filter).sort({ date: -1 });
//     res.json(transactions);
//   } catch (error) {
//     console.error("Fetch transactions failed:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Delete transaction
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Transaction.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.userId, // consistent check
//     });

//     if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
//     res.json({ message: 'Deleted' });
//   } catch (err) {
//     console.error("Delete transaction failed:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Update transaction
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Transaction.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.userId },
//       req.body,
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: 'Transaction not found' });
//     res.json(updated);
//   } catch (err) {
//     console.error("Update transaction failed:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Category summary
// router.get('/summary/category', async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const summary = await Transaction.aggregate([
//       { $match: { userId: new mongoose.Types.ObjectId(userId), type: 'expense' } },
//       {
//         $group: {
//           _id: '$category',
//           total: { $sum: '$amount' },
//         },
//       },
//     ]);

//     res.json(summary);
//   } catch (error) {
//     console.error("Summary failed:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
