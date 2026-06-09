import Image from "next/image";

export default function ServicesSection() {
  return (
    <section className="bg-[#e2e4e6] py-16 px-4 md:px-12 lg:px-24 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              We provide High Quality Services
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
          <div className="relative w-full h-75 md:h-95 overflow-hidden rounded-sm shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
              alt="Business strategy meeting"
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Bottom Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Card 1: Data Analytics */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 bg-[#e2e4e6]">
            {/* Text Side */}
            <div className="flex flex-col justify-center items-center text-center flex-1 order-2 sm:order-1 px-4">
              <div className="w-14 h-14 bg-[#d95d39] rounded-full flex items-center justify-center mb-4 text-white shadow-sm">
                {/* Lightbulb Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-3m0 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 0v-3m3.182-3.182a4.5 4.5 0 0 0-6.364 0M12 21h.008v.008H12V21Zm0-3h.008v.008H12V18Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Data Analytics
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-[200px]">
                Arcu odio ut sem nulla pharetra diam nulla
              </p>
              <a
                href="#"
                className="text-xs font-bold tracking-wider text-gray-900 underline underline-offset-4 hover:text-[#d95d39] transition-colors"
              >
                LEARN MORE
              </a>
            </div>
            {/* Image Side */}
            <div className="relative w-full sm:w-[240px] h-[340px] flex-shrink-0 order-1 sm:order-2 rounded-sm overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                alt="Data analytics team"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 240px"
              />
            </div>
          </div>

          {/* Card 2: How We Helped */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 bg-[#e2e4e6]">
            {/* Text Side */}
            <div className="flex flex-col justify-center items-center text-center flex-1 order-2 sm:order-1 px-4">
              <div className="w-14 h-14 bg-[#d95d39] rounded-full flex items-center justify-center mb-4 text-white shadow-sm">
                {/* Growth Chart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941M3.75 15.75h.007v.008H3.75v-.008Zm.007 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                How we helped
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-[200px]">
                Arcu odio ut sem nulla pharetra diam nulla
              </p>
              <a
                href="#"
                className="text-xs font-bold tracking-wider text-gray-900 underline underline-offset-4 hover:text-[#d95d39] transition-colors"
              >
                LEARN MORE
              </a>
            </div>
            {/* Image Side */}
            <div className="relative w-full sm:w-[240px] h-[340px] flex-shrink-0 order-1 sm:order-2 rounded-sm overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
                alt="Business handshake"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 240px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
