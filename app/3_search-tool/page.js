import connectMongo from "../../libs/mongoose.js";
import PageSkeleton from "./client-components/PageSkeleton.js";
import SearchToolManager from "./custom-servers/SearchToolManager.server.js";



export default async function ClientSearch() {
  await connectMongo();

  return (
      <div className="flex h-screen bg-base-300">
          <PageSkeleton />
          <main className="flex-1 p-4 overflow-y-auto">
              <SearchToolManager />
          </main>
      </div>
  );
}