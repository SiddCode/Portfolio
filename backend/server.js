
require('dotenv').config();
const brevo = require('@getbrevo/brevo');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running ");
});
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (project images, profile photo)
app.use('/assets', express.static(path.join(__dirname, '../frontend/public/assets')));

// DB helper
const DB_PATH = path.join(__dirname, 'db.json');
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// GET all data
app.get('/api/data', (req, res) => {
  try {
    const db = readDB();
    res.json(db);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ── ADMIN LOGIN ──
app.post('/api/admin/login', (req, res) => {
  try {
    const { password } = req.body;
    const db = readDB();
    if (password === db.admin.password) {
      res.json({ success: true, token: 'admin_authenticated' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── ADMIN: Change Password ──
app.put('/api/admin/password', (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const db = readDB();
    if (currentPassword !== db.admin.password) {
      return res.status(401).json({ success: false, message: 'Current password incorrect' });
    }
    db.admin.password = newPassword;
    writeDB(db);
    res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PROFILE ──
app.get('/api/profile', (req, res) => {
  const db = readDB();
  res.json(db.profile);
});

app.put('/api/profile', (req, res) => {
  try {
    const db = readDB();
    db.profile = { ...db.profile, ...req.body };
    writeDB(db);
    res.json({ success: true, profile: db.profile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ── UPLOAD PROFILE PICTURE (DRAG & DROP BASE64) ──
app.put('/api/profile/upload', (req, res) => {
  try {
    const { image } = req.body; // base64 string
    if (!image) return res.status(400).json({ error: 'No image data provided' });
    
    // Remove base64 data prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    const targetPath = path.join(__dirname, '../frontend/public/assets/profile.jpg');
    
    // Ensure parent directories exist
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    
    fs.writeFileSync(targetPath, buffer);
    
    // Also update the db.json timestamp to bust frontend image cache
    const db = readDB();
    db.profile.avatar = `/assets/profile.jpg?t=${Date.now()}`;
    writeDB(db);
    
    res.json({ success: true, avatar: db.profile.avatar });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to save uploaded picture' });
  }
});


// ── PROJECTS ──
app.get('/api/projects', (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

app.post('/api/projects', (req, res) => {
  try {
    const db = readDB();
    const { v4: uuidv4 } = require('uuid');
    const newProject = { id: uuidv4(), ...req.body };
    db.projects.push(newProject);
    writeDB(db);
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.put('/api/projects/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.projects.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Project not found' });
    db.projects[idx] = { ...db.projects[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, project: db.projects[idx] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const db = readDB();
    const before = db.projects.length;
    db.projects = db.projects.filter(p => p.id !== req.params.id);
    if (db.projects.length === before) return res.status(404).json({ error: 'Project not found' });
    writeDB(db);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ── CONTACT / EMAIL ──
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Siddharthan K Portfolio",
      email: "siddharthank45@gmail.com"
    };

    sendSmtpEmail.to = [
      {
        email: "siddharthank45@gmail.com",
        name: "Siddharthan K"
      }
    ];

    sendSmtpEmail.replyTo = {
      email: email,
      name: name
    };

    sendSmtpEmail.subject = `[Portfolio] ${subject}`;

    sendSmtpEmail.htmlContent = `
      <h2>📩 New Portfolio Message</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <hr>

      <p>${message}</p>
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
    
  catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
;

// ── SKILLS UPDATE ──
app.put('/api/skills', (req, res) => {
  try {
    const db = readDB();
    db.skills = { ...db.skills, ...req.body };
    writeDB(db);
    res.json({ success: true, skills: db.skills });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update skills' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Siddharthan K Portfolio API is running 🚀' });
});
app.get("/test", (req, res) => {
  console.log("✅ Test route called");
  res.send("Backend test successful");
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`);
});
