const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow app to accept JSON

// --- MongoDB Connection ---
// This is the magic!
// 'mongo' is the service name we will define in docker-compose.yml
const MONGO_URI = 'mongodb://mongo:27017/mydatabase';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// --- Mongoose Schema (The 'Form') ---
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', UserSchema);

// --- API Routes ---
// Route to handle the form submission
app.post('/api/submit', async (req, res) => {
  console.log('Received data:', req.body);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user' });
  }
});

// (Optional) A route to see all submitted data
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});