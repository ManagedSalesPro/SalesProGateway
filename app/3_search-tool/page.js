import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "../../libs/mongoose.js";
import ClientSearchNavBar from "./components/ClientSearchNavBar.js";
import ClientManager from "./component-manager/ClientManager.server.js";



export default async function ClientSearch() {
  await connectMongo();
  const session = await getServerSession(authOptions);

  return (
      <div className="flex h-screen bg-base-300">
          <ClientSearchNavBar />
          <main className="flex-1 p-4 overflow-y-auto">
              <ClientManager />
          </main>
      </div>
  );
}