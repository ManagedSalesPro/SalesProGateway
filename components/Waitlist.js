import Image from "next/image";
import ButtonLead from "@/components/ButtonLead";


const Waitlist = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          The right leads for your services
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Empower Your MSP with Our Innovative Sales Platform, Offering Access to a Rich Database of 
          Potential Clients and Intelligent Recommendations Tailored to Your Service Offerings!
        </p>
        <ButtonLead className="btn btn-primary btn-wide">Join the Waitlist</ButtonLead>
      </div>
      <div className="lg:w-full">
        <Image
          src="https://source.unsplash.com/Lks7vei-eAg"
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Waitlist;
