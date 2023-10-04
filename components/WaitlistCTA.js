import Image from "next/image";
import ButtonLead from "@/components/ButtonLead";


const WaitlistCTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://source.unsplash.com/5QgIuuBxKwM"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Target the right leads and close deals faster
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Don&apos;t waste time chasing the wrong clients 
          </p>

          <ButtonLead className="btn btn-primary btn-wide">Join The Waitlist</ButtonLead>
        </div>
      </div>
    </section>
  );
};

export default WaitlistCTA;
