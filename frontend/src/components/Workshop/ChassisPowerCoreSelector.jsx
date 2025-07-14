import React, { useState } from 'react';

const ChassisPowerCoreSelector = () => {
  const [selectedChassis, setSelectedChassis] = useState(null);
  const [selectedPowerCore, setSelectedPowerCore] = useState(null);

  const chassisOptions = [
    { id: 'chassis1', name: 'Light Frame', weight: 10, armor: 5, slots: 2 },
    { id: 'chassis2', name: 'Armored Shell', weight: 20, armor: 15, slots: 3 },
  ];

  const powerCoreOptions = [
    { id: 'core1', name: 'Basic Core', energy: 100, recharge: 10 },
    { id: 'core2', name: 'High-Capacity Core', energy: 200, recharge: 15 },
  ];

  return (
    <div>
      <h2>Chassis and Power Core Selection</h2>
      <div>
        <h3>Chassis</h3>
        {chassisOptions.map((chassis) => (
          <button key={chassis.id} onClick={() => setSelectedChassis(chassis)}>
            {chassis.name} (Weight: {chassis.weight}, Armor: {chassis.armor}, Slots: {chassis.slots})
          </button>
        ))}
        {selectedChassis && <p>Selected Chassis: {selectedChassis.name}</p>}
      </div>

      <div>
        <h3>Power Core</h3>
        {powerCoreOptions.map((core) => (
          <button key={core.id} onClick={() => setSelectedPowerCore(core)}>
            {core.name} (Energy: {core.energy}, Recharge: {core.recharge})
          </button>
        ))}
        {selectedPowerCore && <p>Selected Power Core: {selectedPowerCore.name}</p>}
      </div>
    </div>
  );
};

export default ChassisPowerCoreSelector;
