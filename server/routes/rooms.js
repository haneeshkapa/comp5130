// server/routes/rooms.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Room = require('../models/Room');
const User = require('../models/User');

// @route   POST api/rooms
// @desc    Create a new room listing
// @access  Private (Landlords only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isLandlord) {
      return res.status(403).json({ msg: 'Only landlords can create room listings' });
    }

    const newRoom = new Room({
      ...req.body,
      landlord: req.user.id
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/rooms/:id
// @desc    Get room by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Room not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/rooms/:id
// @desc    Update a room
// @access  Private (Landlords only)
router.put('/:id', auth, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    // Make sure user is the landlord
    if (room.landlord.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/rooms/:id
// @desc    Delete a room
// @access  Private (Landlords only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    // Make sure user is the landlord
    if (room.landlord.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await room.remove();
    res.json({ msg: 'Room removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Room not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async (req, res) => {
    try {
      const newRoom = new Room({
        ...req.body,
        user: req.user.id
      });
  
      const room = await newRoom.save();
      res.json(room);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route   GET api/rooms
  // @desc    Get all rooms
  // @access  Public
  router.get('/', async (req, res) => {
    try {
      const rooms = await Room.find().sort({ date: -1 });
      res.json(rooms);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;