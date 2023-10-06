import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import DashboardNavBar from "@/components/DashboardNavBar";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page

export default async function Dashboard() {
  //await connectMongo();
  //const session = await getServerSession(authOptions);
  //const user = await User.findById(session.user.id);

  return (
    <>
      <DashboardNavBar />
      
    </>
  );
}
