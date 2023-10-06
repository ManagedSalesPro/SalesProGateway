import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import ProfileNavBar from "@/components/ProfileNavBar";
import ButtonEditProfile from "@/components/ButtonEditProfile";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page




export default async function Profile() {
  await connectMongo();
  const session = await getServerSession(authOptions);
  
  // Mock user data
  const mockUser = {
    _id: "651b930e997fa569b9fb9685",
    email: "abrehamdadi2@gmail.com",
    name: "Abreham Dadi",
    company: "ACME Service Providers Co.",
    createdAt: new Date("2023-10-03T04:05:34.370+00:00"),
    updatedAt: new Date("2023-10-03T04:05:34.370+00:00"),
    __v: 0
  };

  // Assign the mock user data to the user variable
  const user = mockUser;

  //const user = await User.findById(session.user.id);

  return (
    <div className="flex h-screen bg-base-300">
      <ProfileNavBar />
      <main className="flex-1 p-8 pb-24 overflow-y-auto">
        <section className="max-w-xl mx-auto space-y-8">
          <div class="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
          <h2 class="text-center text-2xl font-semibold mt-3">{user.name}</h2>
          <p class="text-center text-gray-600 mt-1">{user.company}</p>
          <p class="text-center text-gray-600 mt-1">{user.email}</p>
          <ButtonEditProfile />
        </div>
        </section>
      </main>
    </div>
  );
}