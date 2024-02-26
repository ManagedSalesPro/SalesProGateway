import WaitlistHeader from "./components/WaitlistHeader.js";
import Waitlist from "./components/Waitlist.js";
import WaitlistCTA from "./components/WaitlistCTA.js";
import WaitlistFooter from "./components/WaitlistFooter.js";

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