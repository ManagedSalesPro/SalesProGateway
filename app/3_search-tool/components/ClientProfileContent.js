
export default function ClientProfileContent({ client, onBack }) {
    
    if (!client) return <div>No client selected</div>;

    console.log("Client Data:", client);
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <button onClick={onBack} className="text-blue-600 hover:text-blue-800 transition duration-150">
                    ← Back
                </button>
                <h1 className="text-2xl font-bold">{client.companyName}</h1>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 border rounded space-y-2">
                    <span className="font-semibold block mb-2">Industry:</span>
                    <ul>
                        {client.industry.map((ind, index) => (
                            <li key={index}>{ind}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 border rounded space-y-2">
                    <span className="font-semibold block mb-2">Domain:</span>
                    <ul>
                        {client.domain.map((dom, index) => (
                            <li key={index}>{dom}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 border rounded">
                    <span className="font-semibold block mb-2">Location:</span>
                    {client.location}
                </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 border rounded">
                    <span className="font-semibold block mb-2">Estimated Revenue:</span>
                    ${client.estimatedRevenue.toLocaleString()}
                </div>
                <div className="p-4 border rounded">
                    <span className="font-semibold block mb-2">Company Size:</span>
                    {client.companySize}
                </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded space-y-2">
                    <span className="font-semibold block mb-2">Software Stack:</span>
                    <ul>
                        {client.softwareStack.map((software, index) => (
                            <li key={index}>{software}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 border rounded space-y-2">
                    <span className="font-semibold block mb-2">Hardware Stack:</span>
                    <ul>
                        {client.hardwareStack.map((hardware, index) => (
                            <li key={index}>{hardware}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}