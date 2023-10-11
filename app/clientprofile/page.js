"use client";

import ClientProfileNavBar from "@/components/ClientProfileNavBar";
import ClientProfileContent from "@/components/ClientProfileContent";
import ClientSearchTool from "@/components/ClientSearchTool";
import { useState } from 'react';
// ... (other imports)

export default async function clientprofile() {
    // ... (other code)

    const [selectedClientId, setSelectedClientId] = useState(null);

    return (
        <div className="flex h-screen bg-base-300">
            <ClientProfileNavBar />
            <main className="flex-1 p-4 overflow-y-auto">
                <ClientSearchTool onClientSelect={setSelectedClientId} />
                <ClientProfileContent clientId={selectedClientId} />
            </main>
        </div>
    );
}
