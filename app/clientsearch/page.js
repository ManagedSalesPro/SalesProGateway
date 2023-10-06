import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import ClientSearchNavBar from "@/components/ClientSearchNavBar";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page

export default async function ClientSearch() {
  await connectMongo();
  const session = await getServerSession(authOptions);
  
  // Mock user data
  const mockUser = {
    _id: "651b930e997fa569b9fb9685",
    email: "abrehamdadi2@gmail.com",
    createdAt: new Date("2023-10-03T04:05:34.370+00:00"),
    updatedAt: new Date("2023-10-03T04:05:34.370+00:00"),
    __v: 0
  };

  // Assign the mock user data to the user variable
  const user = mockUser;

  //const user = await User.findById(session.user.id);

  return (
    <>
      <ClientSearchNavBar />
    </>
  );
}
