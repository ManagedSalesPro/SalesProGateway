"use client";

import { useEffect, useState } from 'react';

export default function ClientProfileContent({ client }) {
    
    if (!client) return <div>No client selected</div>;

    console.log("Client Data:", client);
    return (
        <div className="rounded bg-white shadow-lg p-4 ">
                <h1>{client.companyName}</h1>
        </div>
     );
}