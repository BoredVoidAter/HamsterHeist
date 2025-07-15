export async function fetchReplayData(matchId) {
    // In a real application, this would make an API call to your backend
    // For now, returning dummy data
    console.log(`Fetching replay data for matchId: ${matchId}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                duration: 60.5,
                events: [
                    { timestamp: 0.1, event_type: 'bot_spawn', bot_id: 'bot_A', data: { x: 10, y: 10 } },
                    { timestamp: 0.5, event_type: 'api_call', bot_id: 'bot_A', data: { api: 'move', params: { direction: 'north' } } },
                    { timestamp: 1.2, event_type: 'sensor_data', bot_id: 'bot_A', data: { sensor: 'proximity', value: 5 } },
                    { timestamp: 1.5, event_type: 'console_log', bot_id: 'bot_A', data: { message: 'Moving towards objective' } },
                    { timestamp: 2.0, event_type: 'bot_spawn', bot_id: 'bot_B', data: { x: 90, y: 90 } },
                    { timestamp: 2.5, event_type: 'api_call', bot_id: 'bot_B', data: { api: 'scan', params: {} } },
                    { timestamp: 3.0, event_type: 'sensor_data', bot_id: 'bot_B', data: { sensor: 'lidar', value: [[0,1],[1,0]] } },
                    { timestamp: 5.0, event_type: 'api_call', bot_id: 'bot_A', data: { api: 'attack', params: { target: 'bot_B' } } },
                    { timestamp: 5.1, event_type: 'console_log', bot_id: 'bot_A', data: { message: 'Engaging enemy!' } },
                    { timestamp: 10.0, event_type: 'golden_seed_collected', bot_id: 'bot_A', data: {} },
                ]
            });
        }, 500);
    });
}
