"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";

export default function ClientSearchTool() {
    const [filters, setFilters] = useState({
        companyName: "",
        companySize: null,
        industry: [],
        domain: "",
        estimatedRevenue: null,
        location: "",
        softwareStack: [],
        hardwareStack: [],
    });
    const [results, setResults] = useState([]);
    const [distinctFilters, setDistinctFilters] = useState({
        industries: [],
        softwareStacks: [],
        hardwareStacks: [],
        domains: [],
        companySizes: [],
        estimatedRevenues: [],
    });

    useEffect(() => {
        fetchDistinctFilters();
    }, []);

    const fetchDistinctFilters = async () => {
        try {
            const response = await apiClient.post("/distinct-filters", filters);
            const data = await response.json();
            setDistinctFilters(data);
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
            <div className="w-1/5 p-4 border-r">
                {/* Filters */}
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
                    <label>Industry</label>
                    {distinctFilters.industries.map(industry => (
                        <label key={industry}>
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
                        </label>
                    ))}
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
                    <label>Location</label>
                    <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        placeholder="Enter city"
                        className="w-full p-2 rounded"
                    />
                </div>

                <div>
                    <label>Software Stack</label>
                    {distinctFilters.softwareStacks.map(stack => (
                        <label key={stack}>
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
                            {stack}
                        </label>
                    ))}
                </div>                

                <div>
                    <label>Hardware Stack</label>
                    {distinctFilters.hardwareStacks.map(stack => (
                        <label key={stack}>
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
                            {stack}
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-4/5 p-4 space-y-2">
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
