require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config/db')
const authRouter = require('./routes/auth')


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-type", "Authorization"],
  credentials: true
}));

// 👉 Add a simple health‑check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Optional: a JSON health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-interview', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Routes
// Import routes (paths are relative to this file)

app.use('/api/auth', authRouter);
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/sessions', require('./routes/sessions'));

// Socket.io for real-time interview
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-interview', (sessionId) => {
    socket.join(sessionId);
    console.log(`User joined interview session: ${sessionId}`);
  });

  socket.on('send-message', (data) => {
    socket.to(data.sessionId).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();

// connectDB()
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });