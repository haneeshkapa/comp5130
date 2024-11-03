const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5001',
  credentials: true
}));

const usernamesRoute = require('/Users/haneeshkapa/Desktop/univrooms/comp5130/server/routes/usernames.js'); // Adjust path if necessary
app.use('/api/usernames', usernamesRoute);

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected');
} catch (error) {
  console.error('MongoDB connection error:', error);
}

// Routes
try {
  const authRoutes = require('./routes/auth');
  if (typeof authRoutes === 'function') {
    app.use('/api/auth', authRoutes);
  } else {
    console.error('Auth routes module is not a function');
  }
} catch (error) {
  console.error('Error loading auth routes:', error.message);
}

try {
  const roomRoutes = require('./routes/rooms');
  if (typeof roomRoutes === 'function') {
    app.use('/api/rooms', roomRoutes);
  } else {
    console.error('Room routes module is not a function');
  }
} catch (error) {
  console.error('Error loading room routes:', error.message);
}

try {
  const userRoutes = require('./routes/users');
  if (typeof userRoutes === 'function') {
    app.use('/api/users', userRoutes);
  } else {
    console.error('User routes module is not a function');
  }
} catch (error) {
  console.error('Error loading user routes:', error.message);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));