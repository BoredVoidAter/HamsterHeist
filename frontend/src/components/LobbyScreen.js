import React, { useState } from 'react';

function LobbyScreen() {
    const [teamName, setTeamName] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const handleQueueForTeamMatch = () => {
        console.log(`Queueing for 2v2 match with team: ${teamName}, player 2: ${player2Name}`);
        // In a real application, this would send a request to the backend matchmaking service
    };

    return (
        <div className="lobby-screen">
            <h2>Lobby</h2>
            <h3>Team Heist (2v2)</h3>
            <input
                type="text"
                placeholder="Your Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Player 2 Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
            />
            <button onClick={handleQueueForTeamMatch}>
                Queue for 2v2 Team Match
            </button>
        </div>
    );
}

export default LobbyScreen;
