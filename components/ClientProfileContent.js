"use client";

import { useEffect, useState } from 'react';

function ClientProfileContent({ clientId }) {
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        if (clientId) {
            // Fetch client data using the clientId
            // For example:
            // const data = await apiClient.get(`/client/${clientId}`);
            // setClientData(data);
        }
    }, [clientId]);

    return (
        <div className="p-4">
            <p><strong>Client Profile</strong></p>
            {/* Display client data here */}
            {clientData && (
                <div>
                    {/* Display client details using clientData */}
                </div>
            )}
        </div>
    );
}

export default ClientProfileContent;