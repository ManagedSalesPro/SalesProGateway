import { signOut } from "next-auth/react";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {

  return (
    <>
      <main
        className="min-h-screen p-8 pb-24"
      >
        <section className="max-w-xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Your Food Recipes
          </h1>

          <p className="text-lg leading-relaxed text-base-content/80">
            {status === "authenticated"
              ? `Welcome ${session?.user?.name}`
              : "You are not logged in"}
            <br />
            {session?.user?.email
              ? `Your email is ${session?.user?.email}`
              : ""}
          </p>

          <button
              className="btn btn-ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
        </section>
      </main>
    </>
  );
}
