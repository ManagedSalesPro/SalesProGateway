"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";

export default function ClientSearchTool() {
    const [filters, setFilters] = useState({
        companyName: "",
        industry: [],
        domain: [],
        minEstimatedRevenue: null,
        maxEstimatedRevenue: null,
        minCompanySize: null,
        maxCompanySize: null,
        location: "",
        softwareStack: [],
        hardwareStack: [],
    });
    const [results, setResults] = useState([]);
    const [distinctFilters, setDistinctFilters] = useState({
        industries: [],
        domains: [],
        minEstimatedRevenue: [],
        maxEstimatedRevenue: [],
        minCompanySize: [],
        maxCompanySize: [],
        softwareStacks: [],
        hardwareStacks: [],
    });
    
    useEffect(() => {
        fetchDistinctFilters();
    }, []);

    const fetchDistinctFilters = async () => {
        try {
            const response = await apiClient.post("/distinct-filters");
            
            setDistinctFilters({
                industries: response.industries,
                softwareStacks: response.softwareStacks,
                hardwareStacks: response.hardwareStacks,
                domains: response.domains,
                minCompanySize: response.minCompanySize,
                maxCompanySize: response.maxCompanySize,
                minEstimatedRevenue: response.minEstimatedRevenue,
                maxEstimatedRevenue: response.maxEstimatedRevenue
            });
        } catch (error) {
            console.error("Error fetching distinct filters:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await apiClient.post("/distinct-filters", filters);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error searching clients:", error);
        }
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
                    name="companyName"
                    className="w-full p-2 rounded"
                />
            </div>
            <div className="w-[30%] p-4 border-r">
                {/* Filters */}

                <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                    <label className="block text-center font-bold mb-2">Industry</label>
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4"> {/* Added padding to the right */}
                        {distinctFilters.industries.map(industry => (
                            <div key={industry} className="flex justify-between items-center mb-2">
                                <span>{industry}</span>
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
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                    <label className="block text-center font-bold mb-2">Domain</label>
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4"> {/* Added padding to the right */}
                        {distinctFilters.domains.map(domain => (
                            <div key={domain} className="flex justify-between items-center mb-2">
                                <span>{domain}</span>
                                <input
                                    type="checkbox"
                                    value={domain}
                                    checked={filters.domain.includes(domain)}
                                    onChange={() => {
                                        const newDomain = [...filters.domain];
                                        if (newDomain.includes(domain)) {
                                            newDomain.splice(newDomain.indexOf(domain), 1);
                                        } else {
                                            newDomain.push(domain);
                                        }
                                        setFilters({ ...filters, domain: newDomain });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                    <label className="block text-center font-bold mb-2">Software Stack</label>
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4"> {/* Added padding to the right */}
                        {distinctFilters.softwareStacks.map(stack => (
                            <div key={stack} className="flex justify-between items-center mb-2">
                                <span>{stack}</span>
                                <input
                                    type="checkbox"
                                    value={stack}
                                    checked={filters.softwareStack.includes(stack)}
                                    onChange={() => {
                                        const newStack = [...filters.softwareStack];
                                        if (newStack.includes(stack)) {
                                            newStack.splice(newStack.indexOf(stack), 1);
                                        } else {
                                            newStack.push(stack);
                                        }
                                        setFilters({ ...filters, softwareStack: newStack });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                    <label className="block text-center font-bold mb-2">Hardware Stack</label>
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4"> {/* Added padding to the right */}
                        {distinctFilters.hardwareStacks.map(stack => (
                            <div key={stack} className="flex justify-between items-center mb-2">
                                <span>{stack}</span>
                                <input
                                    type="checkbox"
                                    value={stack}
                                    checked={filters.hardwareStack.includes(stack)}
                                    onChange={() => {
                                        const newStack = [...filters.hardwareStack];
                                        if (newStack.includes(stack)) {
                                            newStack.splice(newStack.indexOf(stack), 1);
                                        } else {
                                            newStack.push(stack);
                                        }
                                        setFilters({ ...filters, hardwareStack: newStack });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label>Estimated Revenue</label>
                    <input
                        type="range"
                        min={distinctFilters.minEstimatedRevenue}
                        max={distinctFilters.maxEstimatedRevenue}
                        value={filters.estimatedRevenue || ""}
                        onChange={(e) => setFilters({ ...filters, estimatedRevenue: e.target.value })}
                        className="w-full p-2 rounded"
                    />
                    <div className="text-center">{filters.estimatedRevenue || "Any"}</div>
                </div>

                <div>
                    <label>Company Size</label>
                    <input
                        type="range"
                        min={distinctFilters.minCompanySize}
                        max={distinctFilters.maxCompanySize}
                        value={filters.companySize || ""}
                        onChange={(e) => setFilters({ ...filters, companySize: e.target.value })}
                        className="w-full p-2 rounded"
                    />
                    <div className="text-center">{filters.companySize || "Any"}</div>
                </div>

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
            </div>    

            <div className="w-[70%]  p-4 space-y-2">
                {/* Search Results */}
                {results.map((client) => (
                    <div key={client._id} className="p-2 border-b rounded shadow-sm">
                        {client.companyName}
                    </div>
                ))}
            </div>
        </div>
    );
}
