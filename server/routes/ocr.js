const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/image', auth, upload.single('receipt'), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    // Very basic example: match "total 123.45" from text
    const match = text.match(/total\s+(\d+(\.\d+)?)/i);
    const amount = match ? parseFloat(match[1]) : 0;

    res.json({ text, amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OCR failed' });
  }
});

module.exports = router;
