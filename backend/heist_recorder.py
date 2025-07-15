import json
import time

class HeistRecorder:
    def __init__(self):
        self.events = []
        self.start_time = None

    def start_recording(self):
        self.events = []
        self.start_time = time.time()
        print("Heist recording started.")

    def record_event(self, event_type, bot_id, data=None):
        if self.start_time is None:
            print("Warning: Recording not started. Event not recorded.")
            return

        timestamp = time.time() - self.start_time
        event = {
            "timestamp": timestamp,
            "event_type": event_type,
            "bot_id": bot_id,
            "data": data
        }
        self.events.append(event)
        # print(f"Recorded event: {event_type} for bot {bot_id} at {timestamp:.2f}s")

    def get_replay_data(self):
        return {
            "duration": time.time() - self.start_time if self.start_time else 0,
            "events": self.events
        }

    def save_replay(self, filename="replay.json"):
        replay_data = self.get_replay_data()
        with open(filename, 'w') as f:
            json.dump(replay_data, f, indent=4)
        print(f"Replay saved to {filename}")
        return filename
