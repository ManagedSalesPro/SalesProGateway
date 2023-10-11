import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import ClientProfileNavBar from "@/components/ClientProfileNavBar";
import ClientProfileContent from "@/components/ClientProfileContent";

export default async function clientprofile() {
  await connectMongo();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen bg-base-300">
      <ClientProfileNavBar />
      <main className="flex-1 p-4 overflow-y-auto">
        <ClientProfileContent />
      </main>
    </div>
  );
}
