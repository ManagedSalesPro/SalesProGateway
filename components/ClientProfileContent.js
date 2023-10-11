
export default function ClientProfileContent({ client, onBack }) {
    
    if (!client) return <div>No client selected</div>;

    console.log("Client Data:", client);
    return (
        <div className="rounded bg-white shadow-lg p-4 ">
            <button onClick={onBack} className="top-0 left-0 p-4">
                ← Back
            </button>    
            <h1>{client.companyName}</h1>
        </div>
     );
}