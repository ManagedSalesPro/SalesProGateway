import WaitlistHeader from "@/components/WaitlistHeader";
import Waitlist from "@/components/Waitlist";
import WaitlistCTA from "@/components/WaitlistCTA";
import WaitlistFooter from "@/components/WaitlistFooter";

export default function Home() {
  return (
    <>
      <WaitlistHeader />
      <main>
        <Waitlist />
        <WaitlistCTA />
      </main>
      <WaitlistFooter />
    </>
  );
}