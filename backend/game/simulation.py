from backend.models.bot_components import Chassis, PowerCore

class BotSimulation:
    def __init__(self, chassis: Chassis, power_core: PowerCore):
        self.chassis = chassis
        self.power_core = power_core
        self.current_energy = power_core.total_energy

    def consume_energy(self, amount):
        self.current_energy = max(0, self.current_energy - amount)

    def recharge_energy(self):
        self.current_energy = min(self.power_core.total_energy, self.current_energy + self.power_core.recharge_rate)

    def get_energy(self):
        return self.current_energy

    def get_energy_recharge_rate(self):
        return self.power_core.recharge_rate
