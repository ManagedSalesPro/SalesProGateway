"use client";

import { useState } from 'react';

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
