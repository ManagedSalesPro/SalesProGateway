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

    const [selectedClient, setSelectedClient] = useState(null);

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

    function handleClientClick(client) {
        // ... any other logic ...
      
        props.onSelectClient(client);
    }
    
    return (
        <div className="rounded bg-white shadow-lg p-4 ">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for a company by name..."
                    onChange={(e) => {
                        const newSearch = e.target.value;

                        setFilters({ ...filters, companyName: newSearch });
                    }}
                    name="companyName"
                    className="w-full p-2 rounded border border-gray-300"
                />
            </div>
            
            {/* Filters & Search Results*/}
            <div className="rounded bg-white p-4 flex">

                {/* Filters */}
                <div className="w-[30%] p-4 border-r">

                    {/*Industry*/} 
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

                    {/*Domain*/}
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
                    
                    {/*Software Stack*/}
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

                    {/*Hardware Stack*/}
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

                    {/*Estimated Revenue*/}
                    <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                        <label className="block text-center font-bold mb-2">Estimated Revenue</label>
                        <MultiRangeSlider
                            min={0}
                            max={distinctFilters.maxEstimatedRevenue}
                            ruler={false}
                            step={10000000}
                            stepOnly={10000000}
                            minValue={distinctFilters.minEstimatedRevenue}
                            maxValue={distinctFilters.maxEstimatedRevenue}
                            //barLeftColor={"#FFFFFF"}
                            //barRightColor={"#FFFFFF"}
                            barInnerColor={"#66CBFE"}
                            thumbLeftColor={"#FFFFFF"}
                            thumbRightColor={"#FFFFFF"}
                            onChange={(values) => {
                                const newMin = values.minValue;
                                const newMax = values.maxValue;
                                
                                if (newMin !== filters.minEstimatedRevenue || newMax !== filters.maxEstimatedRevenue) {
                                    setFilters({ ...filters, minEstimatedRevenue: newMin, maxEstimatedRevenue: newMax });
                                }
                            }}
                        />
                    </div>

                    {/*Company Size*/}
                    <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                        <label className="block text-center font-bold mb-2">Company Size</label>
                        <MultiRangeSlider
                            min={0}
                            max={distinctFilters.maxCompanySize}
                            ruler={false}
                            step={100}
                            stepOnly={100}
                            minValue={distinctFilters.minCompanySize}
                            maxValue={distinctFilters.maxCompanySize}
                            //barLeftColor={"#FFFFFF"}
                            //barRightColor={"#FFFFFF"}
                            barInnerColor={"#66CBFE"}
                            thumbLeftColor={"#FFFFFF"}
                            thumbRightColor={"#FFFFFF"}
                            onChange={(values) => {
                                const newMin = values.minValue;
                                const newMax = values.maxValue;
                                
                                if (newMin !== filters.minCompanySize || newMax !== filters.maxCompanySize) {
                                    setFilters({ ...filters, minCompanySize: newMin, maxCompanySize: newMax });
                                }
                            }}
                        />
                    </div>

                    {/*Location*/}
                    <div>
                        <label>Location</label>
                        <input
                            type="text"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            placeholder="Enter city name..."
                            className="w-full p-2 rounded border border-gray-300"
                        />
                    </div>
                </div>    
                
                {/* Search Results */}
                <div className="w-[70%] p-4 space-y-2 overflow-y-auto max-h-[500px]"> {/* Adjust max-h value as needed */}
                    {results.map((client) => (
                        <div 
                            key={client.id} 
                            className="p-2 border-b rounded shadow-sm flex justify-between"
                            onClick={() => handleClientClick(client)} >
                            {/* Left Side: Company Name, Industry, and Domain */}
                            <div className="flex-1 pr-4">
                                <div className="font-bold">{client.companyName}</div>
                                
                                <div className="text-sm mt-1">
                                    <span className="font-semibold">Industry:</span> {client.industry.join(', ')}
                                </div>
                                
                                <div className="text-sm mt-1">
                                    <span className="font-semibold">Domain:</span> {client.domain.join(', ')}
                                </div>
                            </div>

                            {/* Right Side: Location, Hardware Stack, and Software Stack */}
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 mb-2">{client.location}</div>
                                <div className="flex justify-between">
                                    <div className="flex-1 pr-2">
                                        <div className="font-semibold mb-1">Hardware Stack</div>
                                        {client.hardwareStack.map((stack, index) => (
                                            <div key={index} className="text-sm">{stack}</div>
                                        ))}
                                    </div>
                                    <div className="flex-1 pl-2">
                                        <div className="font-semibold mb-1">Software Stack</div>
                                        {client.softwareStack.map((stack, index) => (
                                            <div key={index} className="text-sm">{stack}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}