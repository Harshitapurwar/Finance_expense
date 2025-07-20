
# 💰 Personal Finance Tracker

A modern, full-stack web application to track your income and expenses, visualize data with charts, and upload receipts or bank statements for automatic transaction extraction using OCR and AI. Built using the MERN stack + Tailwind CSS + AI integrations like Gemini and OCR.space.

---

## 🚀 Features

- ✅ Add, update, delete transactions (income/expense)
- 📊 Filter by date, category, and visualize with dynamic charts
- 🧾 Upload image/PDF receipts to extract transaction data (amount, date, description)
- 🧠 Gemini Vision AI & OCR.space integration for smart receipt parsing
- 🔐 JWT-based authentication
- 👥 Multi-user support
- 📅 Monthly totals + categorized expenses
- 💡 Responsive, themed UI with dark mode toggle

---

## 🛠️ Tech Stack

**Frontend**:
- ⚛️ React.js
- 💨 Tailwind CSS
- 📦 Axios
- 📈 Recharts
- 🔐 JWT Auth (client-side)

**Backend**:
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔐 JWT Auth (server-side)
- 🧠 Google Gemini Vision API
- 🧾 OCR.space API for text extraction from receipts

---

## 🧑‍💻 Folder Structure

```

personal-finance/
├── client/       # React frontend
│   └── src/
│       ├── components/
│       └── pages/
├── server/       # Express backend
│   ├── routes/
│   ├── models/
│   └── controllers/

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/personal-finance.git
cd personal-finance
````

### 2️⃣ Start the backend

```bash
cd server
npm install
# Add your `.env` with MongoDB URI, JWT_SECRET, Gemini & OCR API keys
npm start
```

> Server runs on `http://localhost:5000`

### 3️⃣ Start the frontend

```bash
cd client
npm install
npm start
```

> Client runs on `http://localhost:3000`

---

## 🔐 .env Configuration (server)

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<your-mongodb-uri>
JWT_SECRET=your_jwt_secret
OCR_SPACE_API_KEY=your_ocr_space_api_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🖼️ Screenshots

Coming soon... 📷

---

## 📦 API Endpoints

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/api/transactions`    | Add a new transaction         |
| GET    | `/api/transactions`    | List all transactions         |
| POST   | `/api/upload`          | Upload image/PDF (Gemini OCR) |
| POST   | `/api/upload-ocrspace` | Upload receipt to OCR.space   |
| POST   | `/api/auth/register`   | Register user                 |
| POST   | `/api/auth/login`      | Login user                    |

---

## 🧠 AI Integrations

* 🔍 **OCR.space API** — for extracting text from printed receipts (images/PDFs)
* 🤖 **Gemini Vision AI** — for intelligent extraction of transaction info from images (like POS receipts)

---

## 🧪 Future Enhancements

* 📤 Export reports to PDF/CSV
* 📅 Budget planning and monthly limits
* 🔔 Notification reminders
* 📱 PWA support

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License © 2025 Harshita Purwar

---

## 🌐 Live Demo (Optional)

> Add link here if deployed on Vercel/Render/Netlify

---

## 🧑‍💻 Author

Made with ❤️ by [Harshita Purwar](https://github.com/<your-github-username>)

```

---

Let me know if you'd like me to:
- Add instructions for deployment (Render/Vercel)
- Auto-generate the `.env.example` file
- Add a contribution guide (`CONTRIBUTING.md`)
```
