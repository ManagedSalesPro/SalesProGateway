import ClientSearchTool from "@/components/ClientSearchTool";
import ClientProfileContent from "@/components/ClientProfileContent";

export default function ClientManager() {
    let selectedClientData = null;

    const handleSelectClient = (clientData) => {
        selectedClientData = clientData;
    };

    return (
        <>
            <ClientSearchTool />
            {selectedClientData && <ClientProfileContent clientData={selectedClientData} />}
        </>
    );
}
