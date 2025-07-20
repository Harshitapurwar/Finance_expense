// const express = require('express');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const fs = require('fs');
// const auth = require('../middleware/authMiddleware');
// const Transaction = require('../models/Transaction');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
//   try {
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const pdfData = await pdfParse(dataBuffer);
//     const text = pdfData.text;

//     const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
//     const userId = req.user.userId;
//     const transactions = [];

//     const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;

//     // Parse lines like: "2024/07/01 Grocery Store 123.45"
//     for (const line of lines) {
//       const match = line.match(/^(.+?)\s+(\d{1,5}\.\d{2})$/);
//       if (match) {
//         const [_, description, amount] = match;

//         const dateLine = lines.find(l => dateRegex.test(l));
//         const dateMatch = dateLine?.match(dateRegex);
//         const formattedDate = dateMatch ? `${dateMatch[3]}-${dateMatch[1]}-${dateMatch[2]}` : new Date().toISOString();

//         transactions.push({
//           user: userId,
//           description: description.trim(),
//           amount: parseFloat(amount),
//           date: new Date(formattedDate),
//           type: 'expense',
//           category: 'Auto PDF'
//         });
//         console.log("transactions:",transactions.amount);
//       }
//     }

//     if (transactions.length > 0) {
//       await Transaction.insertMany(transactions);
//     }

//     res.json({
//       message: 'PDF parsed and transactions saved',
//       extractedCount: transactions.length,
//       transactions
//     });
//   } catch (err) {
//     console.error('PDF Parse error:', err);
//     res.status(500).json({ error: 'Failed to process PDF' });
//   }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { fromPath } = require('pdf2pic');
const Tesseract = require('tesseract.js');
const auth = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const userId = req.user.userId;
    const transactions = [];

    const transactionRegex = /^(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+\$([\d,]+\.\d{2})$/;

    for (const line of lines) {
      const match = line.match(transactionRegex);
      if (match) {
        const [, date, description, amountStr] = match;

        // Determine if it's a credit or debit based on presence of keywords or line position
        const isCredit = /deposit|direct dep|credit/i.test(description);
        const cleanedAmount = parseFloat(amountStr.replace(/,/g, ''));

        transactions.push({
          user: userId,
          description: 'Item',
          amount: cleanedAmount,
          date: new Date(date),
          type: isCredit ? 'income' : 'expense',
          category: 'Auto PDF'
        });
      }
    }

    if (transactions.length > 0) {
      await Transaction.insertMany(transactions);
    }

    res.json({
      message: 'PDF parsed and transactions saved',
      extractedCount: transactions.length,
      transactions
    });
  } catch (err) {
    console.error('PDF Parse error:', err);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});


module.exports = router;
