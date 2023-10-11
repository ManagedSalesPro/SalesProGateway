"use client";

import { useState } from 'react';
import ClientSearchTool from "@/components/ClientSearchTool";
import ClientProfileContent from "@/components/ClientProfileContent";


function ClientManager() {
    const [selectedClient, setSelectedClient] = useState(null);

    const handleSelectClient = (client) => {
        console.log("Client Data:", client);
        setSelectedClient(client);
    };

     // If a client is selected, render the ClientProfileContent component
     if (selectedClient) {
        return <ClientProfileContent client={selectedClient} />;
    }

    // If no client is selected, render the ClientSearchTool component
    return <ClientSearchTool onClientSelect={handleSelectClient} />;
}

export default ClientManager;
