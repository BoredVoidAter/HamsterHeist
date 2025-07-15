// backend/routes/playerProfile.js

const express = require('express');
const router = express.Router();

// Dummy data for demonstration
let playerCustomizations = {};

// Middleware to simulate authentication
router.use((req, res, next) => {
  // In a real app, you'd verify a token or session
  req.userId = req.headers['x-user-id'] || 'testUser'; // Get user ID from header or use a default
  next();
});

// GET /api/playerProfile/customizations
// Get a player's bot customizations
router.get('/customizations', (req, res) => {
  const userId = req.userId;
  const customizations = playerCustomizations[userId] || {
    chassis: 'default',
    paint: 'red',
    accessory: 'none',
  };
  res.json(customizations);
});

// POST /api/playerProfile/customizations
// Save a player's bot customizations
router.post('/customizations', (req, res) => {
  const userId = req.userId;
  const { chassis, paint, accessory } = req.body;

  if (!chassis || !paint || !accessory) {
    return res.status(400).json({ message: 'Missing customization data' });
  }

  playerCustomizations[userId] = { chassis, paint, accessory };
  console.log(`Customizations saved for ${userId}:`, playerCustomizations[userId]);
  res.status(200).json({ message: 'Customizations saved successfully' });
});

module.exports = router;
