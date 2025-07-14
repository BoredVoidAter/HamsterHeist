import time

class EventManager:
    def __init__(self):
        self.events = []
        self.active_events = []

    def add_event(self, event_name, start_time, duration, effect_callback):
        self.events.append({
            'name': event_name,
            'start_time': start_time,
            'duration': duration,
            'effect_callback': effect_callback
        })

    def update(self, current_game_time):
        # Check for events to announce
        for event in self.events:
            if event['start_time'] - current_game_time <= 5 and event not in self.active_events: # Announce 5 seconds before
                print(f"Event Announcement: {event['name']} in {event['start_time'] - current_game_time:.1f} seconds!")

        # Check for events to activate
        for event in self.events:
            if current_game_time >= event['start_time'] and event not in self.active_events:
                self.active_events.append(event)
                event['effect_callback']('activate')
                print(f"Event Activated: {event['name']}")

        # Check for events to deactivate
        for event in list(self.active_events): # Iterate over a copy to allow modification
            if current_game_time >= event['start_time'] + event['duration']:
                event['effect_callback']('deactivate')
                self.active_events.remove(event)
                print(f"Event Deactivated: {event['name']}")

    def get_active_events(self):
        return [event['name'] for event in self.active_events]

    def on_event_announcement(self, callback):
        # This would be called by the bot API to register a callback
        # For now, we'll just print a message
        print("Bot API registered for event announcements.")

# Example Usage (for testing purposes)
if __name__ == "__main__":
    event_manager = EventManager()

    def laser_grid_effect(action):
        if action == 'activate':
            print("Laser Grid is now active!")
        elif action == 'deactivate':
            print("Laser Grid is now inactive.")

    def magnetic_pulse_effect(action):
        if action == 'activate':
            print("Magnetic Pulse is active!")
        elif action == 'deactivate':
            print("Magnetic Pulse has subsided.")

    event_manager.add_event("Laser Grid Activation", 10, 5, laser_grid_effect)
    event_manager.add_event("Magnetic Pulse", 20, 3, magnetic_pulse_effect)

    current_time = 0
    while current_time < 30:
        event_manager.update(current_time)
        time.sleep(1) # Simulate time passing
        current_time += 1
