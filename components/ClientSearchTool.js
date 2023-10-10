"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import MultiRangeSlider from 'multi-range-slider-react';


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

    useEffect(() => {
        handleSearch(); // Call handleSearch whenever filters change
    }, [filters]);

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
                maxEstimatedRevenue: response.maxEstimatedRevenue,
            });
        } catch (error) {
            console.error("Error fetching distinct filters:", error);
        }
    };

    const handleSearch = async () => {
        try {
            console.log("Sending request with filters:", filters);
            const response = await apiClient.post("/search-clients", filters);
            console.log("Received response:", response);
            setResults(response);
        } catch (error) {
            console.error("Error searching clients:", error);
        }
    };

    return (
        <div className="rounded bg-white shadow-lg p-4">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
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
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4">
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
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4">
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
                    <div className="scrollable-box overflow-y-auto max-h-32 pr-4">
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

                <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                    <label className="block text-center font-bold mb-2">Estimated Revenue</label>
                    <MultiRangeSlider
                        min={distinctFilters.minEstimatedRevenue}
                        max={distinctFilters.maxEstimatedRevenue}
                        ruler={false}
                        stepOnly={100}
                        onChange={() => {
                            const newMin = [...filters.minEstimatedRevenue];
                            const newMax = [...filters.maxEstimatedRevenue];
                            
                            setFilters({ ...filters, minEstimatedRevenue: newMin, maxEstimatedRevenue: newMax })
                        }}
                        thumbStyle="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600"
                        trackStyle="bg-blue-300 h-1"
                        rangeStyle="bg-blue-500 h-1"
                    />
                </div>

<div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
    <label className="block text-center font-bold mb-2">Company Size</label>
    <MultiRangeSlider
        min={distinctFilters.minCompanySize}
        max={distinctFilters.maxCompanySize}
        ruler={false}
        stepOnly={100}
        onChange={(values) => {
            const newMin = values.min === distinctFilters.minCompanySize ? null : values.min;
            const newMax = values.max === distinctFilters.maxCompanySize ? null : values.max;
            
            if (newMin !== filters.minCompanySize || newMax !== filters.maxCompanySize) {
                setFilters({ ...filters, minCompanySize: newMin, maxCompanySize: newMax });
            }
        }}
        thumbStyle="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600"
        trackStyle="bg-blue-300 h-1"
        rangeStyle="bg-blue-500 h-1"
    />
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
            
            {/* Search Results */}
            <div className="w-[70%] p-4 space-y-2">
                {results.map((client) => (
                    <div key={client._id} className="p-2 border-b rounded shadow-sm">
                        {client.companyName}
                    </div>
                ))}
            </div>
        </div>
    );
}