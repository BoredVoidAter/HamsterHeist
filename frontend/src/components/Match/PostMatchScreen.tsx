import React from 'react';
import { Link } from 'react-router-dom';

interface PostMatchScreenProps {
  gameId: string;
  winner: string;
  // Add other relevant match statistics here
}

const PostMatchScreen: React.FC<PostMatchScreenProps> = ({ gameId, winner }) => {
  const handleSaveReplay = async () => {
    // In a real application, the GameEngine would have passed the full replay data here
    // For demonstration, we'll assume a dummy replay data structure
    const dummyReplayData = [
      { timestamp: Date.now(), state: { bots: { bot1: { position: { x: 0, y: 0 } } } } },
      { timestamp: Date.now() + 1000, state: { bots: { bot1: { position: { x: 10, y: 10 } } } } },
    ];

    try {
      const response = await fetch('/api/replays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId, replayData: dummyReplayData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      alert('Replay saved successfully!');
    } catch (error) {
      console.error("Error saving replay:", error);
      alert('Failed to save replay.');
    }
  };

  return (
    <div className="post-match-screen">
      <h2>Match Over!</h2>
      <h3>Winner: {winner}</h3>
      <p>Game ID: {gameId}</p>

      <div className="match-stats">
        {/* Display other match statistics here */}
        <p>More stats coming soon!</p>
      </div>

      <div className="actions">
        <button onClick={handleSaveReplay}>Save Replay</button>
        <Link to={`/replay/${gameId}`}>
          <button>View Replay</button>
        </Link>
        <button>Play Again</button>
        <button>Back to Lobby</button>
      </div>
    </div>
  );
};

export default PostMatchScreen;
