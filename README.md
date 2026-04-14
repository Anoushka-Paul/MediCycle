# 💊 Medicycle – Medicine Redistribution System

Medicycle is a web-based platform designed to reduce medicine waste by enabling users to donate, request, and redistribute unused medicines efficiently. The system connects donors, receivers, and administrators to ensure safe and effective reuse of medicines.

---

## 🚀 Features

* 👤 User Registration & Login
* 💊 Donate Medicines
* 🛒 Request / Buy Medicines
* 🔍 Search Medicines by Name
* 🧾 Add to Cart Functionality *(frontend ready)*
* 🧑‍💼 Admin Dashboard (for monitoring and control)
* 🤖 Chatbot (planned integration)
* 💳 Payment Gateway (to be integrated)

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* (React / Vite – if applicable)

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## 📁 Project Structure

medicycle/
│
├── medisync-care-dashboard/   # Frontend
├── medicycle-backend/         # Backend
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Anusha-space/medicycle.git
cd medicycle
```

---

### 2️⃣ Run Frontend

```bash
cd medisync-care-dashboard
npm install
npm run dev
```

➡️ Open in browser:

```
http://localhost:5173
```

---

### 3️⃣ Run Backend

```bash
cd medicycle-backend
npm install
node server.js
```

---

### 4️⃣ Database Setup

* Start MySQL server
* Create a database (e.g., `medicycle`)
* Import required tables (if available)
* Update DB credentials in backend config

---

## ⚠️ Important Notes

* Frontend requires backend to be running for full functionality
* Add-to-cart and API features depend on backend integration
* Ensure MySQL is running before starting backend

---

## 🌟 Future Enhancements

* 🔐 Authentication with JWT
* 📦 Order tracking system
* 📊 Advanced admin analytics
* 📱 Fully responsive UI
* ☁️ Deployment (Vercel + Render)

---

