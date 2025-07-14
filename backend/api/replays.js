// backend/api/replays.js

const express = require('express');
const router = express.Router();
const GameRecorder = require('../game/GameRecorder'); // Assuming GameRecorder is accessible

const gameRecorder = new GameRecorder(); // This should ideally be a singleton or passed in

// Dummy data for demonstration. In a real app, this would come from a database.
const storedReplays = {};

// Endpoint to get a specific replay
router.get('/:replayId', (req, res) => {
  const { replayId } = req.params;
  const replayData = storedReplays[replayId]; // gameRecorder.getRecording(replayId) if still in memory

  if (replayData) {
    res.json(replayData);
  } else {
    res.status(404).send('Replay not found');
  }
});

// Endpoint to save a replay (e.g., after a game ends)
router.post('/', (req, res) => {
  const { gameId, replayData } = req.body;
  if (gameId && replayData) {
    storedReplays[gameId] = replayData; // gameRecorder.stopRecording(gameId) would return this
    console.log(`Replay for game ${gameId} saved.`);
    res.status(201).send({ message: 'Replay saved successfully', replayId: gameId });
  } else {
    res.status(400).send('Missing gameId or replayData');
  }
});

module.exports = router;
