
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Transaction = require('../models/Transaction');
const requireAuth = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    console.info('[INFO] Received file:', req.file);

    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    console.info('[INFO] OCR Extracted Text:\n', text);

    fs.unlink(filePath, () => {}); // cleanup

    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const dateRegex = /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/;
    const amountRegex = /\$?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?/;

    const transactions = [];

    for (const line of lines) {
      const dateMatch = line.match(dateRegex);
      const amountMatch = line.match(amountRegex);

      if (dateMatch && amountMatch) {
        const dateStr = dateMatch[0].replace(/-/g, '/'); // normalize
        const parsedDate = new Date(dateStr);

        if (parsedDate.toString() === 'Invalid Date') continue;

        const amountStr = amountMatch[0].replace(/[^0-9.]/g, '');
        const amount = parseFloat(amountStr);

        if (!isNaN(amount)) {
          transactions.push({
            description: line.substring(dateMatch.index + dateMatch[0].length).trim().slice(0, 50) || 'OCR Receipt',
            amount,
            category: 'Uncategorized',
            date: parsedDate,
            userId: req.user._id
          });
        }
      }
    }

    if (transactions.length === 0) {
      return res.status(400).json({ error: 'Could not extract valid transactions' });
    }

    const inserted = await Transaction.insertMany(transactions);
    console.log('[INFO] Inserted transactions:', inserted.length);
    res.json({ message: 'Transactions saved', transactions: inserted });
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Failed to process receipt' });
  }
});

module.exports = router;
