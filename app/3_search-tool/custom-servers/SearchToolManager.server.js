"use client";

import { useState } from 'react';
import SearchTool from "../client-components/SearchTool.js";
import SelectedSearchResult from "../server-components/SelectedSearchResult.js";


function SearchToolManager() {
    const [selectedClient, setSelectedClient] = useState(null);

    const handleSelectClient = (client) => {
        console.log("Client Data:", client);
        setSelectedClient(client);
    };

    const handleBackToSearch = () => {
        setSelectedClient(null);
    };

    // If a client is selected, render the ClientProfileContent component
    if (selectedClient) {
        return <SelectedSearchResult client={selectedClient} onBack={handleBackToSearch} />;
    }

    // If no client is selected, render the ClientSearchTool component
    return <SearchTool onClientSelect={handleSelectClient} />;
}
export default SearchToolManager;
