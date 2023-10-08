// components/ClientSearchTool.js
"use client";

import { useState } from "react";

export default function ClientSearchTool() {
  const [filters, setFilters] = useState({
    companySize: null,
    industry: [],
    estimatedRevenue: null,
    location: "",
    softwareStack: [],
    hardwareStack: []
  });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    await apiClient.post("/clientsearch", JSON.stringify({ filters }));
    
    const data = await response.json();
    setResults(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded bg-white shadow-lg p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={handleInputChange} 
          name="searchQuery"
          className="w-full p-2 rounded"
        />
      </div>

      {/* Filters */}
      <div className="w-1/5 p-4 border-r space-y-4">
        {/* Company Size */}
        <div>
          <label>Company Size</label>
          <input 
            type="range" 
            value={filters.companySize} 
            onChange={(e) => setFilters({ ...filters, companySize: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Industry */}
        <div>
          <label>Industry</label>
          {["Tech", "Finance", "Health"].map(industry => (
            <div key={industry}>
              <input 
                type="checkbox" 
                value={industry}
                checked={filters.industry.includes(industry)}
                onChange={() => {
                  const newIndustry = [...filters.industry];
                  if (newIndustry.includes(industry)) {
                    newIndustry.splice(newIndustry.indexOf(industry), 1);
                  } else {
                    newIndustry.push(industry);
                  }
                  setFilters({ ...filters, industry: newIndustry });
                }}
              />
              {industry}
            </div>
          ))}
        </div>

        {/* Estimated Revenue */}
        <div>
          <label>Estimated Revenue</label>
          <input 
            type="range" 
            value={filters.estimatedRevenue} 
            onChange={(e) => setFilters({ ...filters, estimatedRevenue: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Geographic Location */}
        <div>
          <label>Location</label>
          <input 
            type="text" 
            value={filters.location} 
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            placeholder="Enter city"
            className="w-full p-2 rounded"
          />
        </div>

        {/* Software Stack & Hardware Stack */}
        {/* Similar to Industry */}
      </div>

      {/* Search Results */}
      <div className="w-4/5 p-4 space-y-2">
        {results.map((client) => (
          <div key={client._id} className="p-2 border-b rounded shadow-sm">{client.companyName}</div>
        ))}
      </div>
    </div>
  );
}
