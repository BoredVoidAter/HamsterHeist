
import asyncio

class MatchmakingService:
    def __init__(self):
        self.team_queue = asyncio.Queue()

    async def enqueue_team(self, team_id, player1_id, player2_id):
        print(f"Team {team_id} ({player1_id}, {player2_id}) enqueued for 2v2 match.")
        await self.team_queue.put((team_id, player1_id, player2_id))

    async def find_match(self):
        while True:
            if self.team_queue.qsize() >= 2:
                team1 = await self.team_queue.get()
                team2 = await self.team_queue.get()
                print(f"Match found: Team {team1[0]} vs Team {team2[0]}")
                # In a real scenario, this would trigger game creation
                return team1, team2
            await asyncio.sleep(1) # Wait a bit before checking again

matchmaking_service = MatchmakingService()
