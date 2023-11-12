// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
}));

// MongoDB Atlas connection URI 
const uri = 'mongodb+srv://anneliesrj:%40zAjjGbLWaULt46@cluster0.mexnhxu.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  
  // Routes
  app.use('/api', require('./controllers/jobs')); 
  
  // Start the server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
