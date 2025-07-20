
# 💰 Personal Finance Tracker

A modern, full-stack web application to track your income and expenses, visualize data with charts, and upload receipts or bank statements for automatic transaction extraction using OCR and AI. Built using the MERN stack +  CSS + AI integrations like Gemini Vision.

---

## 🚀 Features

- ✅ Add, update, delete transactions (income/expense)
- 📊 Filter by date, category, and visualize with dynamic charts
- 🧾 Upload image/PDF receipts to extract transaction data (amount, date, description)
- 🧠 Gemini Vision AI  for smart receipt parsing
- 🔐 JWT-based authentication
- 👥 Multi-user support
- 📅 Monthly totals + categorized expenses
- 💡 Responsive, themed UI with dark mode toggle

---

## 🛠️ Tech Stack

**Frontend**:
- ⚛️ React.js
- 💨 CSS
- 📦 Axios
- 📈 Recharts
- 🔐 JWT Auth (client-side)

**Backend**:
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔐 JWT Auth (server-side)
- 🧠 Google Gemini Vision API

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
git clone https://github.com/Harshitapurwar/Finance_expense.git
cd personal-finance
````

### 2️⃣ Start the backend

```bash
cd server
npm install
# Add your `.env` with MongoDB URI, JWT_SECRET, Gemini & OCR API keys
node server.js
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
GEMINI_API_KEY=your_gemini_api_key
```

---


📽️ [Watch Demo](https://drive.google.com/file/d/19zWS0XLCqWm-wpPZJB8mIcT-FEh0-F1x/view?usp=sharing)

## 🖼️ Screenshots
<img width="2151" height="1147" alt="image" src="https://github.com/user-attachments/assets/257338b1-7e10-4c6e-b408-1899c3980ede" />
<img width="2092" height="1125" alt="image" src="https://github.com/user-attachments/assets/bc99e3bd-eef9-48a0-a12d-d0e11e117219" />
<img width="2141" height="1147" alt="image" src="https://github.com/user-attachments/assets/bfad4b99-8be7-47fe-92b0-05a355c01897" />
<img width="2153" height="1175" alt="image" src="https://github.com/user-attachments/assets/943558a2-5999-437e-98df-f5cff32d45c0" />
<img width="2111" height="1178" alt="image" src="https://github.com/user-attachments/assets/1e47a3fe-828a-47f2-8b30-d9c3537a2b7e" />


---

## 📦 API Endpoints

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/api/transactions`    | Add a new transaction         |
| GET    | `/api/transactionList` | List all transactions         |
| POST   | `/api/upload`          | Upload image/PDF (Gemini OCR) |
| POST   | `/api/auth`            | Register user                 |
| POST   | `/api/auth/logout`     | Logout user                   |

---

## 🧠 AI Integrations

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

Updated soon...

---

## 🧑‍💻 Author

Made with ❤️ by [Harshita Purwar](https://github.com/Harshitapurwar)

```

---

Let me know if you'd like me to:
- Add instructions for deployment (Render/Vercel)
- Auto-generate the `.env.example` file
- Add a contribution guide (`CONTRIBUTING.md`)
```
