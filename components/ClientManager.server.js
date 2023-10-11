"use client";

import { useState } from 'react';
import ClientSearchTool from "@/components/ClientSearchTool";
import ClientProfileContent from "@/components/ClientProfileContent";


function ClientManager() {
  const [selectedClient, setSelectedClient] = useState(null);

  function handleSelectClient(client) {
    setSelectedClient(client);
  }

  return (
    <div>
      <ClientSearchTool onSelectClient={handleSelectClient} />
      {selectedClient && <ClientProfileContent clientData={selectedClient} />}
    </div>
  );
}

export default ClientManager;
