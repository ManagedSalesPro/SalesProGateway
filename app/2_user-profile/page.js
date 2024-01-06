import { getServerSession } from "next-auth";
import { authOptions } from "../../libs/next-auth.js";
import connectMongo from "../../libs/mongoose.js";
import getUserProfile from "../../models/UserProfile.js";
import UserProfileMain from "./components/UserProfileMain.js";
import ButtonEditProfile from "./components/ButtonEditProfile.js";

// To develop and use this in local development env, you will need to pass to mock a user to get their profile information. 
// To do so, comment out the user data const and un comment the mock user data section


export default async function UserProfile() {
  await connectMongo();
  const session = await getServerSession(authOptions);

  const UserProfile = await getUserProfile();
  const user = await UserProfile.findOne(session.user.email);


  /*
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

  */
 
  return (
    <div className="flex h-screen bg-base-300">
      <UserProfileMain />
      <main className="flex-1 p-8 pb-24 overflow-y-auto">
        <section className="max-w-xl mx-auto space-y-8">
            <ButtonEditProfile currentUser={user} className="btn btn-primary btn-wide">Edit Your Profile</ButtonEditProfile>
        </section>
      </main>
    </div>
  );
}
