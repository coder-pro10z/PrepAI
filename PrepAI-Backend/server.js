require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config/db');

// 👉 Import the OpenAI SDK
const { OpenAI } = require('openai');

// 👉 Create the client – **use the correct env var name** (OPENAI_API_KEY)
//     and point it at the OSS endpoint (OSS_API_BASE) you defined in .env
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,          // <-- correct name
  apiKey: process.env.OPENROUTER_API_KEY,          // <-- correct name
  baseURL: process.env.OSS_API_BASE || 'https://openrouter.ai/api/v1'

  // baseURL: process.env.OSS_API_BASE || 'https://api.openai.com/v1'
});

console.log('--- ENV VALUES (Node) ---');
console.log('MONGODB_URI =', process.env.MONGODB_URI);
console.log('OSS_API_BASE =', process.env.OSS_API_BASE);
console.log('OPENROUTER_API_KEY =', process.env.OPENROUTER_API_KEY?.slice(0, 8) + '...');
console.log('--------------------------');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Health‑check routes
app.get('/', (req, res) => res.send('API is running'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));
app.get('/api/test-gpt', async (req, res) => {
  try {
    const resp = await req.openai.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: 'Respond with "Setup OK ✅"' }],
    });
    res.json({ message: resp.choices[0].message.content });
  } catch (err) {
    console.error('GPT test error:', err.response?.data || err.message);
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

// Routes – the OpenAI client is needed inside the interview route,
// so we attach it to the request object for easy access.
app.use((req, res, next) => {
  req.openai = openai;   // <-- make it available to route handlers
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/sessions', require('./routes/sessions'));

// Socket.io …
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join-interview', (sessionId) => {
    socket.join(sessionId);
    console.log(`User joined interview session: ${sessionId}`);
  });
  socket.on('send-message', (data) => {
    socket.to(data.sessionId).emit('receive-message', data);
  });
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
startServer();