import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// See https://shipfa.st/docs/tutorials/private-page

// To develop and use this in local development env, you will need to pass the
// Auth login. to do so, comment out the if statment in the layout.js and follow the instructions on the page.js file.

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);

  
  if (!session) {
    redirect(config.auth.loginUrl);
  }
  

  return <>{children}</>;
}
