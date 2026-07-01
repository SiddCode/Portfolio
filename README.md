# Siddharthan K — Portfolio Website

A premium full-stack portfolio built with **React (Vite) + Node.js + Express.js + db.json**

**Theme:** Smoky Blue & Warm Ivory | **Cursor:** Custom animated | **Admin:** Protected console

---

## 🚀 Quick Start

### 1. Start Backend
```bash
cd backend
npm install
# Add your Gmail App Password to .env first!
npm run dev
```

### 2. Start Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 3. Open
- **Portfolio:** http://localhost:5173
- **Admin Console:** http://localhost:5173/admin (password: `admin@siddha123`)

---

## 📧 Email Setup (Contact Form)

To enable the contact form to send emails:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Factor Authentication**
3. Go to **App Passwords** → Generate for "Mail"
4. Copy the 16-character password
5. Open `backend/.env` and replace `your_gmail_app_password_here` with it

---

## 📁 Project Structure
```
PORTFOLIO/
├── backend/        → Node.js + Express API
│   ├── server.js   → Main server
│   ├── db.json     → JSON database
│   └── .env        → Gmail credentials
│
└── frontend/       → React (Vite) app
    ├── src/
    │   ├── components/  → All UI sections
    │   ├── pages/       → Admin.jsx
    │   └── context/     → Toast notifications
    └── public/
        └── assets/      → Profile photo + project images
```

---

## ⚙️ Admin Console Features
- **Projects:** Add / Edit / Delete with image preview
- **Profile:** Name, bio, email, phone, social links
- **Contact Info:** All contact details editable
- **Password:** `admin@siddha123` (changeable in db.json)

---

## 🌟 Features
- ✅ Custom animated cursor (dot + ring)
- ✅ Typewriter hero animation
- ✅ Particle canvas background
- ✅ Scroll-animated sections
- ✅ Toast notifications
- ✅ SEO meta tags
- ✅ Mobile responsive
- ✅ Admin dashboard
- ✅ Email integration (Nodemailer)
- ✅ Social media links

## 📸 Add Your Photo
Replace `frontend/public/assets/profile.jpg` with your actual photo.
