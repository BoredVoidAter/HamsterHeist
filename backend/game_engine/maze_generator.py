import random

class MazeGenerator:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.maze = self._generate_empty_maze()
        self.data_terminals = []

    def _generate_empty_maze(self):
        # Placeholder for actual maze generation logic
        return [[0 for _ in range(self.width)] for _ in range(self.height)]

    def place_data_terminals(self, num_terminals):
        for i in range(num_terminals):
            x = random.randint(0, self.width - 1)
            y = random.randint(0, self.height - 1)
            terminal_id = f"terminal_{i}"
            self.data_terminals.append({"id": terminal_id, "x": x, "y": y, "hacked": False})
            print(f"Placed data terminal {terminal_id} at ({x}, {y})")
        return self.data_terminals

    def get_maze(self):
        return self.maze

    def get_data_terminals(self):
        return self.data_terminals
