"use client";

import { useState } from 'react';
import ClientSearchTool from "@/components/ClientSearchTool";
import ClientProfileContent from "@/components/ClientProfileContent";


function ClientManager() {
    const [selectedClient, setSelectedClient] = useState(null);

    const handleSelectClient = (client) => {
        setSelectedClient(client);
    };

    return (
        <div>
            <ClientSearchTool onClientSelect={handleSelectClient} />
            <ClientProfileContent client={selectedClient} />
        </div>
    );
}

export default ClientManager;
