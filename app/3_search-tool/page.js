import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "../../libs/mongoose.js";
import SearchToolMain from "./components/SearchToolMain.js";
import SearchToolManager from "./components-manager/SearchToolManager.server.js";



export default async function ClientSearch() {
  await connectMongo();

  return (
      <div className="flex h-screen bg-base-300">
          <SearchToolMain />
          <main className="flex-1 p-4 overflow-y-auto">
              <SearchToolManager />
          </main>
      </div>
  );
}