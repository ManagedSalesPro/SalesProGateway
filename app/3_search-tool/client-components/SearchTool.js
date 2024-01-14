"use client";

import { useState, useEffect, useCallback } from "react";
import apiClient from "../../../libs/api.js";
import Select from 'react-select';
import MultiRangeSlider from 'multi-range-slider-react';


export default function ClientSearchTool({ onClientSelect }) {
    const [filters, setFilters] = useState({
        companyName: "",
        industry: [],
        location: "",
        softwareStack: [],
        hardwareStack: [],
        minCompanySize: null,
        maxCompanySize: null,

    });
    const [results, setResults] = useState([]);
    const [distinctFilters, setDistinctFilters] = useState({
        industries: [],
        softwareStacks: [],
        hardwareStacks: [],
        locationOptions: [],
        minEmployeeCount: 0,
        maxEmployeeCount: 100000, // Default or an estimated maximum
    });

    useEffect(() => {
        fetchDistinctFilters();
    }, []);

    useEffect(() => {
        handleSearch(); // Call handleSearch whenever filters change
    }, [handleSearch]);

    const fetchDistinctFilters = async () => {
        try {
            const response = await apiClient.post("/distinct-filters");

            const locationOptions = [
                ...response.cityStateLocations.map(loc => ({ label: loc, value: loc })),
                ...response.cityLocations.map(city => ({ label: city, value: city })),
                ...response.stateLocations.map(state => ({ label: state, value: state }))
            ];

            setDistinctFilters({
                industries: response.industries,
                softwareStacks: response.softwareStacks,
                hardwareStacks: response.hardwareStacks,
                locationOptions,
                minEmployeeCount: response.minEmployeeCount || 0,
                maxEmployeeCount: response.maxEmployeeCount || 100000,
            });
        } catch (error) {
            console.error("Error fetching distinct filters:", error);
        }
    };

    const handleSearch = useCallback(async () => {
        try {
            console.log("ClientSearchTool - Sending request with filters:", filters);
            const response = await apiClient.post("/search-clients", filters);
            console.log("Received response:", response);
            setResults(response);
        } catch (error) {
            console.error("Error searching clients:", error);
        }
    }, [filters]); // dependencies of handleSearch

    const handleClientClick = (clientData) => {
        onClientSelect(clientData);
    };
    
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

                    {/*Software Stack*/}
                    <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                        <label className="block text-center font-bold mb-2">Software Stack</label>
                        <div className="scrollable-box overflow-y-auto max-h-32 pr-4">
                            {distinctFilters.softwareStacks.map(softStack => (
                                <div key={softStack} className="flex justify-between items-center mb-2">
                                    <span>{softStack}</span>
                                    <input
                                        type="checkbox"
                                        value={softStack}
                                        checked={filters.softwareStack.includes(softStack)}
                                        onChange={() => {
                                            const newSoftStack = [...filters.softwareStack];
                                            if (newSoftStack.includes(softStack)) {
                                                newSoftStack.splice(newSoftStack.indexOf(softStack), 1);
                                            } else {
                                                newSoftStack.push(softStack);
                                            }
                                            setFilters({ ...filters, softwareStack: newSoftStack });
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
                            {distinctFilters.hardwareStacks.map(hardStack => (
                                <div key={hardStack} className="flex justify-between items-center mb-2">
                                    <span>{hardStack}</span>
                                    <input
                                        type="checkbox"
                                        value={hardStack}
                                        checked={filters.hardwareStack.includes(hardStack)}
                                        onChange={() => {
                                            const newHardStack = [...filters.hardwareStack];
                                            if (newHardStack.includes(hardStack)) {
                                                newHardStack.splice(newHardStack.indexOf(hardStack), 1);
                                            } else {
                                                newHardStack.push(hardStack);
                                            }
                                            setFilters({ ...filters, hardwareStack: newHardStack });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*Company Size*/}
                    <div className="rounded border border-gray-300 bg-blue-50 p-2 mb-4">
                        <label className="block text-center font-bold mb-2">Company Size</label>
                        <MultiRangeSlider
                            id={"CompanySize"}
                            min={1}
                            max={distinctFilters.maxEmployeeCount}
                            ruler={false}
                            step={100}
                            stepOnly={100}
                            minValue={distinctFilters.minEmployeeCount}
                            maxValue={distinctFilters.maxEmployeeCount}
                            barInnerColor={"#66CBFE"}
                            thumbLeftColor={"#FFFFFF"}
                            thumbRightColor={"#FFFFFF"}
                            onChange={(values) => {
                                const newCompSizeMin = values.minValue;
                                const newCompSizeMax = values.maxValue;
                                
                                if (newCompSizeMin !== filters.minCompanySize || newCompSizeMax !== filters.maxCompanySize) {
                                    setFilters({ ...filters, minCompanySize: newCompSizeMin, maxCompanySize: newCompSizeMax });
                                }
                            }}
                        />
                    </div>

                    {/*Location*/}
                    <div>
                        <label>Location</label>
                        <Select
                            options={distinctFilters.locationOptions}
                            isMulti
                            onChange={(selectedOptions) =>
                                setFilters({ ...filters, location: selectedOptions.map(option => option.value) })
                            }
                            className="w-full p-2 rounded border border-gray-300"
                        />
                    </div>
                </div>    
                
                {/* Search Results */}
                <div className="w-[70%] p-4 space-y-2 overflow-y-auto max-h-[500px]"> {/* Adjust max-h value as needed */}
                    {results.map((client) => (
                        <div 
                                key={client.id} 
                                className="p-2 border-b rounded shadow-sm flex justify-between w-full text-left cursor-pointer hover:bg-gray-100"
                                onClick={() => handleClientClick(client)} 
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleClientClick(client)}
                            >
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