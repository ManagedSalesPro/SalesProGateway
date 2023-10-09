import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import ClientSearchNavBar from "@/components/ClientSearchNavBar";
import ClientSearchTool from "@/components/ClientSearchTool";


export default async function clientseaerch() {
  await connectMongo();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen bg-base-300">
      <ClientSearchNavBar />
      <main className="flex-1 p-8 pb-24 overflow-y-auto">
        <ClientSearchTool />
      </main>
    </div>
  );
}
