import connectMongo from "../../libs/mongoose.js";
import PageSkeleton from "./client-components/PageSkeleton.js";
import UserProfile from "./client-components/UserProfile.js";

export default async function ClientSearch() {
  await connectMongo();

  return (
    <div className="flex h-screen bg-base-300">
      <PageSkeleton />
      <main className="flex-1 p-4 overflow-y-auto">
              <UserProfile />
          </main>
    </div>
  );
}