// backend/game/GameRecorder.js

class GameRecorder {
  constructor() {
    this.recordings = {}; // Stores recordings by game session ID
  }

  startRecording(gameId) {
    this.recordings[gameId] = [];
    console.log(`Started recording for game: ${gameId}`);
  }

  recordGameState(gameId, gameState) {
    if (this.recordings[gameId]) {
      this.recordings[gameId].push({
        timestamp: Date.now(),
        state: gameState
      });
    }
  }

  stopRecording(gameId) {
    const recording = this.recordings[gameId];
    if (recording) {
      console.log(`Stopped recording for game: ${gameId}. Recorded ${recording.length} states.`);
      // In a real application, you would save this to a database or file system
      // For now, we'll just return it.
      delete this.recordings[gameId]; // Clear from active recordings
      return recording;
    }
    return null;
  }

  getRecording(gameId) {
    // In a real application, this would fetch from storage
    return this.recordings[gameId]; // For now, return if still in memory
  }
}

module.exports = GameRecorder;
