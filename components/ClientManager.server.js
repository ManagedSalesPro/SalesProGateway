// ClientManager.server.js

import ClientSearchTool from './ClientSearchTool';
import ClientProfileContent from './ClientProfileContent';

function ClientManager() {
  let selectedClient = null;

  function handleSelectClient(client) {
    selectedClient = client;
  }

  return (
    <div>
      <ClientSearchTool onSelectClient={handleSelectClient} />
      {selectedClient && <ClientProfileContent clientData={selectedClient} />}
    </div>
  );
}

export default ClientManager;
