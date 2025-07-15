import React, { useState, useEffect } from 'react';
import { fetchReplayData } from '../api/replays';

function ReplayViewer({ matchId }) {
    const [replayData, setReplayData] = useState(null);
    const [selectedBot, setSelectedBot] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (matchId) {
            fetchReplayData(matchId).then(data => {
                setReplayData(data);
                // Optionally set initial selected bot
                if (data && data.events && data.events.length > 0) {
                    setSelectedBot(data.events[0].bot_id);
                }
            });
        }
    }, [matchId]);

    if (!replayData) {
        return <div>Loading replay...</div>;
    }

    const botIds = [...new Set(replayData.events.map(event => event.bot_id))];

    const filteredEvents = selectedBot
        ? replayData.events.filter(event => event.bot_id === selectedBot)
        : replayData.events;

    return (
        <div className="replay-viewer">
            <h2>Replay Viewer for Match: {matchId}</h2>
            <div className="replay-controls">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <span>Current Time: {currentTime.toFixed(2)}s / {replayData.duration.toFixed(2)}s</span>
            </div>

            <div className="bot-selection">
                <h3>Select Bot:</h3>
                {botIds.map(botId => (
                    <button
                        key={botId}
                        className={selectedBot === botId ? 'active' : ''}
                        onClick={() => setSelectedBot(botId)}
                    >
                        Bot {botId}
                    </button>
                ))}
            </div>

            <div className="event-log">
                <h3>Event Log {selectedBot ? `for Bot ${selectedBot}` : ''}:</h3>
                <ul>
                    {filteredEvents.map((event, index) => (
                        <li key={index}>
                            [{event.timestamp.toFixed(2)}s] Bot {event.bot_id}: {event.event_type} - {JSON.stringify(event.data)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ReplayViewer;
