const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const lines = data.text.split('\n');
    const transactions = lines.filter(l => l.match(/\d{2}\/\d{2}\/\d{4}/)); // crude filter

    res.json({ raw: data.text, transactions });
  } catch (err) {
    res.status(500).json({ error: 'PDF parse failed' });
  }
});

module.exports = router;
