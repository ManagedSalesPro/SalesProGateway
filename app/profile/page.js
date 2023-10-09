import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import ProfileNavBar from "@/components/ProfileNavBar";
import ButtonEditProfile from "@/components/ButtonEditProfile";


export default async function Profile() {
  await connectMongo();
  const session = await getServerSession(authOptions);

  
  // Mock user data
  const mockUser = {
    _id: '651cc972ac3c03abc4e9fdc2',
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
            <ButtonEditProfile currentUser={user} className="btn btn-primary btn-wide">Edit Your Profile</ButtonEditProfile>
        </section>
      </main>
    </div>
  );
}
