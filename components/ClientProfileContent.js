"use client";

import { useEffect, useState } from 'react';

export default function ClientProfileContent({ client }) {
    
    if (!client) return <div>No client selected</div>;

    return (
        <div>
            <h1>{client.name}</h1>
            {/* ... (rest of the code to display client details) */}
        </div>
    );
}


