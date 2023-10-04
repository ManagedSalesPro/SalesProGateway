
import { useState } from "react";
import { signOut } from "next-auth/react";
import apiClient from "@/libs/api";
import { usePrivate } from "@/hooks/usePrivate";
import TagSEO from "@/components/TagSEO";

export default function Dashboard() {
  // Custom hook to make private pages easier to deal with (see /hooks folder)
  const [session, status] = usePrivate({});
  const [isLoading, setIsLoading] = useState(false);

  // Show a loader when the session is loading. Not needed but recommended if you show user data like email/name
  if (status === "loading") {
    return <p>Loading...</p>;
  }

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