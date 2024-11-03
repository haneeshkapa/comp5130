// server/server.js
const express = require('express');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true, // If you're using cookies
}));

app.use(helmet()); // Secure HTTP headers

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/users', require('./routes/users'));
app.use('/api/usernames', require('./routes/usernames'));

// Error Handling Middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// server/server.js
const morgan = require('morgan');
app.use(morgan('dev')); // Use 'combined' for more detailed logs
