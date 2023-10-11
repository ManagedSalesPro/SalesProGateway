"use client";

import { useEffect, useState } from 'react';

function ClientProfileContent({ clientData }) {
    return (
        <div className="p-4">
            <p><strong>Client Profile</strong></p>
            {/* Display client data here */}
            <div>
                {/* Display client details using clientData */}
                <p>Name: {clientData.name}</p>
                {/* ... (other client details) */}
            </div>
        </div>
    );
}

export default ClientProfileContent;

