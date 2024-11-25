// server/server.js

const express = require('express');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const logger = require('./config/logger'); // Import the logger

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
})); // Adjust origin as needed
app.use(helmet()); // Secure HTTP headers
app.use(morgan('combined', { stream: logger.stream })); // HTTP request logger using morgan and Winston

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
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start Server
const server = app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

// Graceful Shutdown
process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully.');
  server.close(() => {
    logger.info('Closed out remaining connections.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    logger.info('Closed out remaining connections.');
    process.exit(0);
  });
});

// Export app for testing purposes
module.exports = app;
