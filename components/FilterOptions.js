// components/FilterOptions.js
"use client";

import { useState, useEffect } from 'react';

function FilterOptions({ onFilter }) {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [companySize, setCompanySize] = useState([0, 1000]); // Assuming a range
  const [industry, setIndustry] = useState([]);
  const [revenue, setRevenue] = useState([0, 1000000]); // Assuming a range
  const [softwareStack, setSoftwareStack] = useState([]);
  const [hardwareStack, setHardwareStack] = useState([]);

  useEffect(() => {
    // Fetch available options from the MongoDB client collection
    const fetchDistinctValues = async () => {
      const resLocations = await fetch('/api/clientsearch/distinct/location');
      const dataLocations = await resLocations.json();
      setLocations(dataLocations);

      const resIndustries = await fetch('/api/clientsearch/distinct/industry');
      const dataIndustries = await resIndustries.json();
      setIndustry(dataIndustries);

      const resSoftwareStacks = await fetch('/api/clientsearch/distinct/softwareStack');
      const dataSoftwareStacks = await resSoftwareStacks.json();
      setSoftwareStack(dataSoftwareStacks);

      const resHardwareStacks = await fetch('/api/clientsearch/distinct/hardwareStack');
      const dataHardwareStacks = await resHardwareStacks.json();
      setHardwareStack(dataHardwareStacks);
    };
    
    fetchDistinctValues();
  }, []);

  const handleFilter = () => {
    onFilter({
      location,
      companySize,
      industry,
      revenue,
      softwareStack,
      hardwareStack
    });
  };

  return (
    <div className="filter-container">
      <input 
        type="text" 
        placeholder="Location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        list="locations"
      />
      <datalist id="locations">
        {locations.map(loc => <option key={loc} value={loc} />)}
      </datalist>
      
      <input 
        type="range" 
        min="0" 
        max="1000" 
        value={companySize[1]} 
        onChange={(e) => setCompanySize([companySize[0], e.target.value])} 
      />
      <span>{companySize[0]} - {companySize[1]}</span>
      
      {/* Render industry checkboxes */}
      {industry.map(ind => (
        <label key={ind}>
          <input 
            type="checkbox" 
            value={ind} 
            onChange={() => {
              if (industry.includes(ind)) {
                setIndustry(prev => prev.filter(i => i !== ind));
              } else {
                setIndustry(prev => [...prev, ind]);
              }
            }}
          />
          {ind}
        </label>
      ))}
      
      <input 
        type="range" 
        min="0" 
        max="1000000" 
        value={revenue[1]} 
        onChange={(e) => setRevenue([revenue[0], e.target.value])} 
      />
      <span>${revenue[0]} - ${revenue[1]}</span>
      
      {/* Render software stack checkboxes */}
      {softwareStack.map(software => (
        <label key={software}>
          <input 
            type="checkbox" 
            value={software} 
            onChange={() => {
              if (softwareStack.includes(software)) {
                setSoftwareStack(prev => prev.filter(s => s !== software));
              } else {
                setSoftwareStack(prev => [...prev, software]);
              }
            }}
          />
          {software}
        </label>
      ))}
      
      {/* Render hardware stack checkboxes */}
      {hardwareStack.map(hardware => (
        <label key={hardware}>
          <input 
            type="checkbox" 
            value={hardware} 
            onChange={() => {
              if (hardwareStack.includes(hardware)) {
                setHardwareStack(prev => prev.filter(h => h !== hardware));
              } else {
                setHardwareStack(prev => [...prev, hardware]);
              }
            }}
          />
          {hardware}
        </label>
      ))}
      
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
}

export default FilterOptions;
