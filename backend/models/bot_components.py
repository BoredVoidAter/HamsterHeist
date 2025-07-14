
class Chassis:
    def __init__(self, name, weight, armor, module_slots):
        self.name = name
        self.weight = weight
        self.armor = armor
        self.module_slots = module_slots

class PowerCore:
    def __init__(self, name, total_energy, recharge_rate):
        self.name = name
        self.total_energy = total_energy
        self.recharge_rate = recharge_rate
