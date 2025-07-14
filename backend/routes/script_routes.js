const express = require('express');
const router = express.Router();
const BotScript = require('../models/BotScript');

// Save a bot script
router.post('/scripts', async (req, res) => {
    try {
        const { name, code } = req.body;
        const newScript = new BotScript({ name, code });
        await newScript.save();
        res.status(201).json(newScript);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all bot scripts
router.get('/scripts', async (req, res) => {
    try {
        const scripts = await BotScript.find();
        res.json(scripts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single bot script by ID
router.get('/scripts/:id', async (req, res) => {
    try {
        const script = await BotScript.findById(req.params.id);
        if (!script) return res.status(404).json({ message: 'Script not found' });
        res.json(script);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
