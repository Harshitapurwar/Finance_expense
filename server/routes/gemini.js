// routes/upload-gemini.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

const genAI = new GoogleGenerativeAI("AIzaSyB2zY0p3kp3ezQzSrAcEFfkZJOBUChXhwc");

const upload = multer({ dest: "uploads/" });

router.post("/api/upload-gemini", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileBuffer = fs.readFileSync(file.path);
    const base64Image = fileBuffer.toString("base64");
    const mimeType = file.mimetype;

    const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in ISO format)
      - Description or items purchased (brief summary)
      - Merchant/store name
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,other-expense )

      Only respond with valid JSON in this exact format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      If it's not a receipt, return an empty object.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text().replace(/```(?:json)?\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return res.status(400).json({ error: "Failed to parse Gemini response" });
    }

    fs.unlinkSync(file.path); // delete temp file
    res.json(parsed);
  } catch (err) {
    console.error("Gemini receipt error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/upload-gemini-pdf", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.mimetype.includes("pdf")) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const fileBuffer = fs.readFileSync(file.path);
    const base64PDF = fileBuffer.toString("base64");
    const mimeType = file.mimetype;

    const prompt = `
      Analyze this PDF bank/receipt statement and extract a single transaction in the following JSON format:
      {
        "amount": number,
        "date": "ISO date string",
        "description": "string",
        "merchantName": "string",
        "category": "string"
      }

      Focus on the largest/most recent transaction on the document.
      If no transaction is found, return an empty object.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64PDF,
          mimeType,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text().replace(/```(?:json)?\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return res.status(400).json({ error: "Failed to parse Gemini response" });
    }
    fs.unlinkSync(file.path); // clean up
    res.json(parsed);
  } catch (err) {
    console.error("Gemini PDF scan error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;


