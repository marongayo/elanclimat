import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="w-full px-3 sm:px-5 md:px-8 py-4 bg-[#ffffff]">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#141d14] rounded-3xl overflow-hidden shadow-xl">
        {/* Left Content Side */}
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-16 min-h-100 md:min-h-125">
          {/* Top Tag */}
          <div>
            <span className="inline-block bg-[#242d24] text-[#a1ad9c] text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full uppercase">
              Talk to Us
            </span>
          </div>

          {/* Main Heading */}
          <div className="my-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight">
              Let's design your ideal system together.
            </h2>
          </div>

          {/* CTA Button */}
          <div>
            <button className="inline-flex items-center gap-3 bg-white hover:bg-transparent border-2 border-white text-black hover:text-white font-bold pl-6 pr-2 py-2 rounded-full transition-all duration-300 cursor-pointer group">
              <span className="text-sm tracking-wider uppercase">
                Request a Call
              </span>
              <div className="bg-black group-hover:bg-white p-2 rounded-full text-white group-hover:text-black group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="relative w-full h-72 sm:h-96 md:h-auto md:min-h-125">
          <Image
            src="/images/contact.jpg"
            alt="Contact Us Image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}
