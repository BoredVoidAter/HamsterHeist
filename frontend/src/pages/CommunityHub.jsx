import React, { useState, useEffect } from 'react';

const CommunityHub = () => {
  const [blueprints, setBlueprints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBlueprint, setNewBlueprint] = useState({
    name: '',
    chassis_id: '',
    power_core_id: '',
    modules: '',
    code: '',
    author_id: 1, // Placeholder for current user
  });

  useEffect(() => {
    fetchBlueprints();
  }, [searchTerm]);

  const fetchBlueprints = async () => {
    try {
      const response = await fetch(`/api/blueprints?q=${searchTerm}`);
      const data = await response.json();
      setBlueprints(data);
    } catch (error) {
      console.error('Error fetching blueprints:', error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blueprints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlueprint),
      });
      if (response.ok) {
        setNewBlueprint({
          name: '',
          chassis_id: '',
          power_core_id: '',
          modules: '',
          code: '',
          author_id: 1,
        });
        fetchBlueprints();
      } else {
        console.error('Failed to publish blueprint');
      }
    } catch (error) {
      console.error('Error publishing blueprint:', error);
    }
  };

  const handleChange = (e) => {
    setNewBlueprint({ ...newBlueprint, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Community Hub</h1>

      <section>
        <h2>Publish Your Blueprint</h2>
        <form onSubmit={handlePublish}>
          <input type="text" name="name" placeholder="Blueprint Name" value={newBlueprint.name} onChange={handleChange} required />
          <input type="number" name="chassis_id" placeholder="Chassis ID" value={newBlueprint.chassis_id} onChange={handleChange} required />
          <input type="number" name="power_core_id" placeholder="Power Core ID" value={newBlueprint.power_core_id} onChange={handleChange} required />
          <input type="text" name="modules" placeholder="Modules (comma-separated IDs)" value={newBlueprint.modules} onChange={handleChange} />
          <textarea name="code" placeholder="Bot Code" value={newBlueprint.code} onChange={handleChange} required></textarea>
          <button type="submit">Publish Blueprint</button>
        </form>
      </section>

      <section>
        <h2>Browse Blueprints</h2>
        <input
          type="text"
          placeholder="Search blueprints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {blueprints.map((blueprint) => (
            <div key={blueprint.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{blueprint.name}</h3>
              <p>Author: {blueprint.author_id}</p>
              <p>Chassis ID: {blueprint.chassis_id}</p>
              <p>Power Core ID: {blueprint.power_core_id}</p>
              <p>Modules: {blueprint.modules}</p>
              <pre>{blueprint.code}</pre>
              {/* Add import/rate functionality here */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityHub;
