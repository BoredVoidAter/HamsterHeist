import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface GameState {
  bots: { [key: string]: any };
  projectiles: any[];
  puddles: any[];
}

interface ReplayFrame {
  timestamp: number;
  state: GameState;
}

const ReplayViewer: React.FC = () => {
  const { replayId } = useParams<{ replayId: string }>();
  const [replayData, setReplayData] = useState<ReplayFrame[] | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplay = async () => {
      try {
        const response = await fetch(`/api/replays/${replayId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReplayData(data);
      } catch (error) {
        console.error("Error fetching replay:", error);
      }
    };

    fetchReplay();
  }, [replayId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && replayData) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prevIndex) => {
          if (prevIndex < replayData.length - 1) {
            return prevIndex + 1;
          } else {
            setIsPlaying(false);
            return prevIndex; // Stay on the last frame
          }
        });
      }, 1000 / playbackSpeed); // Adjust interval based on playback speed
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, replayData, playbackSpeed]);

  const currentFrame = replayData ? replayData[currentFrameIndex] : null;
  const currentGameState = currentFrame ? currentFrame.state : null;

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrameIndex(Number(event.target.value));
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaybackSpeed(Number(event.target.value));
  };

  if (!replayData) {
    return <div>Loading replay...</div>;
  }

  return (
    <div className="replay-viewer">
      <h2>Replay: {replayId}</h2>

      <div className="playback-controls">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max={replayData.length - 1}
          value={currentFrameIndex}
          onChange={handleSliderChange}
        />
        <span>Frame: {currentFrameIndex + 1} / {replayData.length}</span>
        <select value={playbackSpeed} onChange={handleSpeedChange}>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={4}>4x</option>
        </select>
      </div>

      <div className="game-visualization">
        {/* This is where the visual representation of the game state would go */}
        {currentGameState && (
          <div>
            <h3>Bots:</h3>
            <ul>
              {Object.entries(currentGameState.bots).map(([botId, botData]) => (
                <li key={botId} onClick={() => setSelectedBotId(botId)} style={{ cursor: 'pointer', fontWeight: selectedBotId === botId ? 'bold' : 'normal' }}>
                  Bot ID: {botId} (Position: {botData.position.x.toFixed(2)}, {botData.position.y.toFixed(2)})
                </li>
              ))}
            </ul>

            {selectedBotId && currentGameState.bots[selectedBotId] && (
              <div className="selected-bot-details">
                <h4>Details for Bot: {selectedBotId}</h4>
                <pre>{JSON.stringify(currentGameState.bots[selectedBotId], null, 2)}</pre>
              </div>
            )}

            {/* Render projectiles and puddles visually here as well */}
            <h3>Projectiles:</h3>
            <ul>
              {currentGameState.projectiles.map((p, index) => (
                <li key={index}>Projectile {index + 1}: Type: {p.type}, Pos: ({p.position.x.toFixed(2)}, {p.position.y.toFixed(2)})</li>
              ))}
            </ul>
            <h3>Puddles:</h3>
            <ul>
              {currentGameState.puddles.map((p, index) => (
                <li key={index}>Puddle {index + 1}: Slow Factor: {p.slowFactor}, Remaining Time: {(p.remainingTime / 1000).toFixed(1)}s, Pos: ({p.position.x.toFixed(2)}, {p.position.y.toFixed(2)})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplayViewer;
