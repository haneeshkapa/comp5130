const express = require('express');
const router = express.Router();
const Username = require('../models/Username'); // Adjust path as needed

// POST api/usernames - Add a new username
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUsername = new Username({
      username,
      email,
      password // In a real application, hash this before storing
    });

    const savedUsername = await newUsername.save();
    res.json(savedUsername);
  } catch (error) {
    console.error('Error saving username:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
