import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import getUserModel from "@/models/User";
import ProfileNavBar from "@/components/ProfileNavBar";
import ButtonEditProfile from "@/components/ButtonEditProfile";


export default async function Profile() {
  await connectMongo();
  const session = await getServerSession(authOptions);
  const User = await getUserModel();
  const user = await User.findById(session.user.id);

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
