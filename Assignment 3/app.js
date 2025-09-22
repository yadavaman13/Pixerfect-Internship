/**
 * Blog API - Simple yet powerful RESTful API
 * Built with love for the Pixerfect Internship
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Blog API! 🚀',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
      comments: '/api/comments'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server running smoothly',
    uptime: Math.floor(process.uptime()) + ' seconds'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  
  let message = 'Something went wrong!';
  let statusCode = 500;

  // Handle common errors
  if (error.name === 'ValidationError') {
    message = Object.values(error.errors).map(val => val.message).join(', ');
    statusCode = 400;
  } else if (error.name === 'CastError') {
    message = 'Invalid ID format';
    statusCode = 400;
  } else if (error.code === 11000) {
    message = 'Email already exists';
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 Blog API is running on port ${PORT}
📚 Check README.md for API documentation
  `);
});

module.exports = app;